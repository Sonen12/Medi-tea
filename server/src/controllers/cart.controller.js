const { BadRequestError, NotFoundError } = require("../core/error.response");
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");
const couponModel = require("../models/coupon.model");
const { Created, OK } = require("../core/success.response");

async function calculateTotalPrice(findCartUser) {
  const allProductIds = findCartUser.products.map((p) => p.productId);
  const productsData = await productModel.find({ _id: { $in: allProductIds } });
  let totalPrice = 0;
  findCartUser.products.forEach((p) => {
    const product = productsData.find(
      (prod) => prod._id.toString() === p.productId.toString(),
    );
    if (product) {
      const priceAfterDiscount =
        product.priceProduct -
        (product.priceProduct * product.discountProduct) / 100;
      totalPrice += priceAfterDiscount * p.quantity;
    }
  });
}
class CartController {
  async creatCart(req, res) {
    const { id } = req.user;
    console.log(req.user);
    const { productId, quantity } = req.body;
    if (!id || !productId || !Number(quantity)) {
      throw new BadRequestError("Không tồn tại sản phẩm ");
    }
    const findProductDb = await productModel.findById(productId);
    if (!findProductDb) {
      throw new BadRequestError("Không tồn tại sản phẩm ");
    }
    if (findProductDb.stockProduct < Number(quantity)) {
      throw new BadRequestError("Sản phẩm không đủ");
    }
    let findCartUser = await cartModel.findOne({ userId: id });
    if (!findCartUser) {
      findCartUser = await cartModel.create({
        userId: id,
        products: [
          {
            productId,
            quantity: Number(quantity),
          },
        ],
      });
      await findProductDb.updateOne({
        $inc: { stockProduct: -Number(quantity) },
      });
    } else {
      const findProduct = findCartUser.products.find(
        (p) => p.productId.toString() === productId,
      );
      if (findProduct) {
        findProduct.quantity += Number(quantity);
        await findProductDb.updateOne({
          $inc: { stockProduct: -Number(quantity) },
        });
      } else {
        findCartUser.products.push({
          productId,
          quantity: Number(quantity),
        });
        await findProductDb.updateOne({
          $inc: { stockProduct: -Number(quantity) },
        });
      }
      await findCartUser.save();
    }
    await calculateTotalPrice(findCartUser);
    return new OK({
      message: "Thêm vào giỏ hàng thành công",
      metadata: findCartUser,
    }).send(res);
  }
  async updateCart(req, res) {
    const id = req.user;
    const { productId, newQuantity } = req.body;
    if (!id || !productId) {
      throw new BadRequestError("Không có sản phẩm trong giỏ hàng ");
    }
    const findCartUser = await cartModel.findOne({ userId: id });
    if (!findCartUser) {
      throw new NotFoundError("Không co san pham trong giỏ hàng này");
    }
    const findProductInCart = findCartUser.products.find(
      (p) => p.productId.toString() === productId,
    );
    if (!findProductInCart) {
      throw new NotFoundError("Không có sản phẩm trong giỏ hàng ");
    }
    const productDb = await productModel.findById(productId);
    if (!productDb) {
      throw new NotFoundError("Sản phẩm không tồn tại");
    }
    const currentQuantity = findProductInCart.quantity;
    // newQuantity = 0 => xóa khỏi giỏ hàng

    if (Number(newQuantity) === 0) {
      productDb.stockProduct += findProductInCart.quantity;
      findCartUser.products = findCartUser.products.filter(
        (p) => p.productId.toString() !== productId,
      );
      await productDb.save();
      // nguoi dung tang so luong
    } else if (Number(newQuantity) > currentQuantity) {
      const addedQuantity = Number(newQuantity) - currentQuantity;
      if (productDb.stockProduct < addedQuantity) {
        throw new BadRequestError("Số lượng sản phẩm không đủ");
      }
      findProductInCart.quantity = newQuantity;
      productDb.stockProduct -= addedQuantity;
      await productDb.save();
    }
    // nguoi dung giam so luong
    else if (Number(newQuantity) < currentQuantity) {
      const removedQuantity = currentQuantity - Number(newQuantity);
      findProductInCart.quantity = newQuantity;
      productDb.stockProduct += removedQuantity;
      await productDb.save();
    }
    await calculateTotalPrice(findCartUser);
    return new OK({
      message: "Cập nhật số lượng thành công",
      metadata: findCartUser,
    }).send(res);
  }
  async deleteCart(req, res) {
    const id = req.user;
    const { productId } = req.body;
    if (!id || !productId) {
      throw new BadRequestError("Thiếu thông tin giỏ hàng");
    }
    const findCartUser = await cartModel.findOne({ userId: id });
    if (!findCartUser) {
      throw new NotFoundError("Khong co gio hang nay");
    }
    const findProductInCart = findCartUser.products.find(
      (p) => p.productId.toString() === productId,
    );
    if (!findProductInCart) {
      throw new NotFoundError("Sản phẩm không tồn tại trong giỏ hàng");
    }
    const productDb = await productModel.findById(productId);
    if (!productDb) {
      throw new NotFoundError("Sản phẩm không tồn tại trong giỏ hàng");
    }
    findCartUser.products = findCartUser.products.filter(
      (p) => p.productId.toString() !== productId,
    );
    productDb.stockProduct =
      productDb.stockProduct + findProductInCart.quantity;
    await productDb.save();
    await calculateTotalPrice(findCartUser);
    return new OK({
      message: "Xóa sản phẩm thành công khỏi giỏ hàng",
      metadata: findCartUser,
    }).send(res);
  }
  async updateInfoCart(req, res) {
    const id = req.user;
    const { fullName, phoneNumber, address, email } = req.body;
    if (!fullName || !id || !phoneNumber || !address || !email) {
      throw new BadRequestError("Thiếu thông tin giỏ hàng ");
    }
    const findCartUser = await cartModel.findOne({ id: userId });
    if (!findCartUser) {
      throw new NotFoundError("Giỏ hàng không tồn tại");
    }
    findCartUser.fullName = fullName;
    findCartUser.phoneNumber = phoneNumber;
    findCartUser.address = address;
    findCartUser.email = email;
    await findCartUser.save();
    return new OK({
      message: "Cập nhật thành công",
      metadata: findCartUser,
    }).send(res);
  }
  async getCartInUser(req, res) {
    const id = req.user;

    const findCartUser = await cartModel
      .findOne({ userId: id })
      .populate("products.productId");

    const today = new Date();

    const coupons = await couponModel.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
      minPrice: { $lte: findCartUser.totalPrice },
      quantity: { $gt: 0 },
    });

    if (!findCartUser) {
      const newCart = await cartModel.create({
        userId: id,
        products: [],
        coupons: coupons,
      });
      return new OK({
        message: "Lấy giỏ hàng thành công",
        metadata: { cart: newCart, coupons },
      }).send(res);
    }

    return new OK({
      message: "Lấy giỏ hàng thành công",
      metadata: { cart: findCartUser, coupons },
    }).send(res);
  }
  async applyCoupon(req, res) {
    const id = req.user;
    const { couponId } = req.body;
    if (!id || !couponId) {
      throw new BadRequestError("Thiếu thông tin giỏ hàng ");
    }
    const findCartUser = await cartModel.findOne({ userId: id });
    if (!findCartUser) {
      throw new NotFoundError("Giỏ hàng không tồn tại");
    }
    const findCoupon = await couponModel.findOne(couponId);
    if (!findCoupon) {
      throw new NotFoundError("Mã giảm giá không tồn tại");
    }
    switch (true) {
      case findCoupon.quantity <= 0:
        throw new BadRequestError("Mã giảm giá đã hết số lượng");
      case findCoupon.startDate > new Date():
        throw new BadRequestError("Mã giảm giá chưa bắt đầu");
      case findCoupon.endDate < new Date():
        throw new BadRequestError("Mã giảm giá đã hết hạn");
      case findCartUser.totalPrice < findCoupon.minPrice:
        throw new BadRequestError(
          "Đơn hàng không đủ điều kiện áp dụng mã giảm giá",
        );
      default:
        break;
    }
    findCartUser.couponId = findCoupon._id;
    findCartUser.finalPrice =
      findCartUser.totalPrice -
      (findCartUser.totalPrice * findCoupon.discount) / 100;
    await findCartUser.save();
    return new OK({
      message: "Cập nhật mã giảm giá thành công",
      metadata: findCartUser,
    }).send(res);
  }
}
module.exports = new CartController();
