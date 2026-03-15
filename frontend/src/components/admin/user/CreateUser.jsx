import { Form, Input, Button, Switch, DatePicker, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/api";

export default function CreateUser() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        date: new Date().toLocaleDateString("vi-VN"),
        dob: values.dob.format("DD/MM/YYYY"),
        isAdmin: values.isAdmin || false,
      };
      await createUser(data);
      message.success("Tạo người dùng thành công");
      navigate("/admin/table-user");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Tạo người dùng thất bại",
      );
    }
  };

  return (
    <Card title="Thêm người dùng mới" style={{ maxWidth: 600 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>

        <Form.Item
          label="Quyền Admin"
          name="isAdmin"
          valuePropName="checked"
        >
          <Switch checkedChildren="Admin" unCheckedChildren="User" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Tạo người dùng
          </Button>
          <Button onClick={() => navigate("/admin/table-user")}>Quay lại</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
