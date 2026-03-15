const {
  ConflictRequestError,
  NotFoundError,
  AuthFailureError,
  BadRequestError,
} = require("../core/error.response");
const { Created, OK } = require("../core/success.response");

const userModel = require("../models/user.model");
const otpModel = require("../models/otp.model");
const jwt = require("jsonwebtoken");

const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  verifyTokenGoogle,
} = require("../auth/checkAuth");
const SendMailForgotPassword = require("../utils/mailForgotPassword");

const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

function setCookie(res, accessToken, refreshToken) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
  });
  res.cookie("logged", 1, {
    httpOnly: false,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
  });
}

class UsersController {
  async register(req, res) {
    const { fullName, email, password, date, dob, isAdmin } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      throw new ConflictRequestError("Email đã tồn tại");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      fullName,
      email,
      date,
      dob,
      password: hashedPassword,
      isAdmin,
    });

    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    setCookie(res, accessToken, refreshToken);

    return new Created({
      message: "Đăng ký thành công",
      metadata: newUser,
    }).send(res);
  }
  async login(req, res) {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      throw new NotFoundError("Tài khoản hoặc mật khẩu không chính xác !");
    }

    const isMathPassword = await bcrypt.compare(password, findUser.password);

    if (!isMathPassword) {
      throw new AuthFailureError("Tài khoản hoặc mật khẩu không chính xác !");
    }

    const accessToken = createAccessToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });

    setCookie(res, accessToken, refreshToken);

    return new OK({
      message: "Đăng nhập thành công",
      metadata: { accessToken, refreshToken, user: findUser },
    }).send(res);
  }

  async googleLogin(req, res) {
    const { token } = req.body;
    if (!token) {
      throw new BadRequestError("Thiếu token xác thực từ Google");
    }

    const payload = await verifyTokenGoogle(token);
    if (!payload) {
      throw new AuthFailureError("Token Google không hợp lệ");
    }

    const { email, name: fullName } = payload;
    let findUser = await userModel.findOne({ email });

    if (!findUser) {
      // Create a default random password for Google-authenticated users
      const randomPassword = Math.random().toString(36).slice(-10);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

      findUser = await userModel.create({
        fullName,
        email,
        date: new Date().toLocaleDateString("vi-VN"),
        dob: "N/A", // Use a placeholder or prompt later
        password: hashedPassword,
        isAdmin: false,
      });
    }

    const accessToken = createAccessToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });

    setCookie(res, accessToken, refreshToken);

    return new OK({
      message: "Đăng nhập Google thành công",
      metadata: { accessToken, refreshToken, user: findUser },
    }).send(res);
  }

  async authUser(req, res) {
    const userId = req.user;
    if (!userId) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      throw new NotFoundError("Người dùng không tồn tại");
    }

    return new OK({
      message: "Xác thực thành công",
      metadata: findUser,
    }).send(res);
  }

  async logout(req, res) {
    const userId = req.user;
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      throw new NotFoundError("Người dùng không tồn tại");
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("logged");
    return new OK({
      message: "Đăng xuất thành công",
      metadata: findUser,
    }).send(res);
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      throw new NotFoundError("Email không tồn tại");
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const tokenForgotPassword = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    res.cookie("tokenForgotPassword", tokenForgotPassword, {
      httpOnly: false,
      secure: true,
      maxAge: 5 * 60 * 1000, // 5 minutes
      sameSite: "strict",
    });

    await otpModel.create({
      otp,
      email,
    });

    await SendMailForgotPassword(email, otp);

    return new OK({
      message: "Mã OTP đã được gửi đến email của bạn",
      metadata: true,
    }).send(res);
  }

  async verifyForgotPassword(req, res) {
    const { otp, password } = req.body;
    const tokenForgotPassword = req.cookies.tokenForgotPassword;
    if (!tokenForgotPassword || !otp) {
      throw new BadRequestError("Bạn đang thiếu thông tin");
    }
    const decoded = jwt.verify(tokenForgotPassword, process.env.JWT_SECRET);
    if (!decoded) {
      throw new BadRequestError("Vui lòng gửi lại yêu cầu ");
    }

    const email = decoded.email;

    const findOtp = await otpModel.findOne({ email, otp });
    if (!findOtp) {
      throw new BadRequestError("Mã OTP không hợp lệ");
    }

    const findUser = await userModel.findOne({ email });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    findUser.password = hashedPassword;

    await findUser.save();

    await otpModel.deleteMany({ email });
    res.clearCookie("tokenForgotPassword");

    return new OK({
      message: "Khôi phục mật khẩu thành công",
      metadata: true,
    }).send(res);
  }
  async verifyOTP(req, res) {
    const { otp } = req.body;
    const tokenForgotPassword = req.cookies.tokenForgotPassword;

    if (!tokenForgotPassword || !otp) {
      throw new BadRequestError("Bạn đang thiếu thông tin");
    }

    // giải mã token để lấy email
    const decoded = jwt.verify(tokenForgotPassword, process.env.JWT_SECRET);
    if (!decoded) {
      throw new BadRequestError("Token không hợp lệ");
    }

    const email = decoded.email;

    // kiểm tra OTP trong database
    const findOtp = await otpModel.findOne({ email, otp });

    if (!findOtp) {
      throw new BadRequestError("Mã OTP không hợp lệ");
    }

    return new OK({
      message: "Xác thực OTP thành công",
      metadata: true,
    }).send(res);
  }
  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const decoded = await verifyToken(refreshToken);
    if (!decoded) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const accessToken = createAccessToken({ id: decoded.id });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });

    return new OK({
      message: "Refresh token thành công",
      metadata: true,
    }).send(res);
  }
  async getUserById(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new NotFoundError("Không có id");
    }
    const findUser = await userModel.findById(id);
    if (!findUser) {
      throw new NotFoundError("Không có người dùng");
    }
    return new OK({
      message: "Lấy người dùng thành công",
      metadata: findUser,
    }).send(res);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new NotFoundError("Không tìm thấy người dùng");
    }
    const findUser = await userModel.findById(id);
    if (!findUser) {
      throw new NotFoundError("Không tìm thấy người dùng");
    }
    await findUser.deleteOne();
    return new OK({
      message: "Xóa thành công",
      metadata: findUser,
    }).send(res);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new NotFoundError("Không tìm thấy người dùng");
    }
    const { fullName, email, date, dob, isAdmin } = req.body;

    const findUser = await userModel.findById(id);
    if (!findUser) {
      throw new NotFoundError("Không tìm thấy người dùng");
    }

    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (email !== undefined) updateData.email = email;
    if (date !== undefined) updateData.date = date;
    if (dob !== undefined) updateData.dob = dob;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return new OK({
      message: "Update thành công",
      metadata: updatedUser,
    }).send(res);
  }

  async getAllUser(req, res) {
    const users = await userModel.find();
    return new OK({
      message: "Lấy user thành công",
      metadata: users,
    }).send(res);
  }
}

module.exports = new UsersController();
