import React, { useState } from "react";
import { Button, Form, Input, message, Steps } from "antd";
import { MailOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Đếm ngược gửi lại OTP
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Bước 1: Gửi email để nhận OTP
  const handleSendOtp = async () => {
    if (!email.trim()) {
      message.warning("Vui lòng nhập email!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/forgot-password`, { email }, { withCredentials: true });
      message.success(res.data.message || "Mã OTP đã được gửi đến email của bạn!");
      setCurrentStep(1);
      startCountdown();
    } catch (error) {
      const msg = error.response?.data?.message || "Không thể gửi OTP. Vui lòng thử lại!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác nhận OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length < 6) {
      message.warning("Vui lòng nhập đầy đủ mã OTP 6 số!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/verify-otp`, { email, otp }, { withCredentials: true });
      message.success(res.data.message || "Xác nhận OTP thành công!");
      setCurrentStep(2);
    } catch (error) {
      const msg = error.response?.data?.message || "Mã OTP không đúng. Vui lòng thử lại!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Bước 3: Đặt lại mật khẩu
  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-password`, {
        email,
        otp,
        newPassword: values.password,
      }, { withCredentials: true });
      message.success(res.data.message || "Đổi mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const msg = error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated background */}
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
        <div className="auth-logo">
          <div className="auth-logo-icon">🔑</div>
          <h1 className="auth-logo-title">Quên mật khẩu</h1>
          <p className="auth-logo-subtitle">Lấy lại mật khẩu qua mã OTP</p>
        </div>

        {/* Steps indicator */}
        <div className="auth-steps">
          <Steps
            current={currentStep}
            size="small"
            items={[
              { title: "Email" },
              { title: "OTP" },
              { title: "Mật khẩu mới" },
            ]}
          />
        </div>

        {/* === BƯỚC 1: Nhập Email === */}
        {currentStep === 0 && (
          <div className="auth-step-content">
            <p className="auth-step-desc">
              Nhập email tài khoản của bạn, chúng tôi sẽ gửi mã OTP để xác nhận.
            </p>
            <Form layout="vertical" onFinish={handleSendOtp}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="auth-btn-primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Gửi mã OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {/* === BƯỚC 2: Nhập OTP === */}
        {currentStep === 1 && (
          <div className="auth-step-content">
            <p className="auth-step-desc">
              Mã OTP đã gửi đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư.
            </p>
            <Form layout="vertical" onFinish={handleVerifyOtp}>
              <Form.Item
                label="Mã OTP"
                name="otp"
                rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
              >
                <Input
                  prefix={<SafetyOutlined />}
                  placeholder="Nhập mã 6 số"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  style={{ letterSpacing: "8px", textAlign: "center", fontSize: "18px", fontWeight: "700" }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="auth-btn-primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Xác nhận OTP
                </Button>
              </Form.Item>
              <div className="auth-resend-otp">
                {countdown > 0 ? (
                  <span>Gửi lại sau {countdown}s</span>
                ) : (
                  <Button type="link" onClick={handleSendOtp} loading={loading}>
                    Gửi lại mã OTP
                  </Button>
                )}
              </div>
            </Form>
          </div>
        )}

        {/* === BƯỚC 3: Đặt mật khẩu mới === */}
        {currentStep === 2 && (
          <div className="auth-step-content">
            <p className="auth-step-desc">
              Tạo mật khẩu mới cho tài khoản của bạn.
            </p>
            <Form layout="vertical" onFinish={handleResetPassword}>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Nhập mật khẩu mới"
                />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="auth-btn-primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        <div className="auth-bottom-link">
          <span>Nhớ mật khẩu rồi? </span>
          <Button type="link" onClick={() => navigate("/login")}>
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
