const usersRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const authRoutes = require("./auth.routes");
const couponRoutes = require("./coupon.routes");
function routes(app) {
  app.use("/api/user", usersRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/coupon", couponRoutes);
}

module.exports = routes;
