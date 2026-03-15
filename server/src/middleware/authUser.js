const { verifyToken } = require("../auth/checkAuth");
const { AuthFailureError } = require("../core/error.response");
const userModel = require("../models/user.model");

const authUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const loggoed = req.cookies.logged;
    if ((loggoed && !accessToken) || (!loggoed && accessToken)) {
      res.clearCookie("logged");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    if (!accessToken) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const decoded = await verifyToken(accessToken);
    if (!decoded) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    if (error instanceof AuthFailureError) throw error;
    throw new AuthFailureError("Vui lòng đăng nhập lại");
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const loggoed = req.cookies.logged;
    if ((loggoed && !accessToken) || (!loggoed && accessToken)) {
      res.clearCookie("logged");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    if (!accessToken) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const decoded = await verifyToken(accessToken);
    if (!decoded) {
      throw new AuthFailureError("Vui lòng đăng nhập lại");
    }
    const user = await userModel.findById(decoded.id);
    if (!user || user.isAdmin !== true) {
      throw new AuthFailureError("Bạn không có quyền truy cập");
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    if (error instanceof AuthFailureError) throw error;
    throw new AuthFailureError("Vui lòng đăng nhập lại");
  }
};

module.exports = { authUser, authAdmin };
