import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import request from "../../config/request";
import { googleLogin } from "../../services/api";
import { useGoogleLogin } from "@react-oauth/google";
import { notification, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./AuthPage.css";

/* Tea leaf SVG component */
const TeaLeaf = () => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 4C18 4 8 20 8 36c0 12 8 24 24 24s24-12 24-24C56 20 46 4 32 4z" fill="currentColor" opacity="0.6" />
    <path d="M32 10c0 0 0 40 0 46" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
    <path d="M32 20c-8 4-14 10-14 18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M32 20c8 4 14 10 14 18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
  </svg>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await googleLogin(tokenResponse.access_token);
        const user = res.data.metadata.user;
        localStorage.setItem("user", JSON.stringify(user));
        notification.success({
          message: "Đăng ký thành công!",
          description: `Chào mừng ${user.fullName || user.email} đến với Medi-Tea.`,
        });
        navigate("/");
      } catch (error) {
        notification.error({
          message: "Đăng ký thất bại",
          description: error.response?.data?.message || "Lỗi xác thực Google",
        });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      notification.error({
        message: "Đăng ký thất bại",
        description: "Không thể kết nối với Google",
      });
    },
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await request.post("/user/register", {
        fullName: values.fullname,
        date: new Date().toLocaleDateString("vi-VN"),
        dob: values.dob ? values.dob.format("DD/MM/YYYY") : "01/01/2000",
        email: values.email,
        password: values.password,
        isAdmin: false
      }, { withCredentials: true });
      message.success("Đăng kí thành công!");
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Đăng kí thất bại!";
      message.error(errMsg);
      console.log("Register error", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Vui lòng kiểm tra lại thông tin!");
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="auth-page">
      {/* Animated background elements */}
      <div className="tea-leaf tea-leaf--1"><TeaLeaf /></div>
      <div className="tea-leaf tea-leaf--2"><TeaLeaf /></div>
      <div className="tea-leaf tea-leaf--3"><TeaLeaf /></div>
      <div className="tea-leaf tea-leaf--4"><TeaLeaf /></div>
      <div className="tea-leaf tea-leaf--5"><TeaLeaf /></div>
      <div className="tea-leaf tea-leaf--6"><TeaLeaf /></div>
      <div className="tea-steam tea-steam--1" />
      <div className="tea-steam tea-steam--2" />
      <div className="tea-steam tea-steam--3" />
      <div className="auth-circle auth-circle--1" />
      <div className="auth-circle auth-circle--2" />
      <div className="auth-circle auth-circle--3" />

      <div className="auth-card">
        {/* Logo & Branding */}
        <div className="auth-logo">
          <div className="auth-logo-icon">🍵</div>
          <h1 className="auth-logo-title">Đăng ký tài khoản</h1>
          <p className="auth-logo-subtitle">Tham gia cùng Medi-Tea ngay hôm nay</p>
        </div>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập họ và tên"
            />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dob"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker
              placeholder="Chọn ngày sinh"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="auth-btn-primary"
              htmlType="submit"
              loading={loading}
            >
              Đăng ký tài khoản
            </Button>
          </Form.Item>

          <Divider className="auth-divider" plain>
            hoặc
          </Divider>

          <Button
            className="auth-btn-google"
            icon={<GoogleOutlined />}
            onClick={() => handleGoogleAuth()}
          >
            Tiếp tục với Google
          </Button>
        </Form>

        <div className="auth-bottom-link">
          <span>Đã có tài khoản? </span>
          <Button type="link" onClick={() => navigate("/login")}>
            Đăng nhập ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
