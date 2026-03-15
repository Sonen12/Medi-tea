import { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Spin, message, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../../services/api";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        if (res.data?.metadata) {
          const user = res.data.metadata;
          form.setFieldsValue({
            fullName: user.fullName,
            email: user.email,
            dob: user.dob,
            isAdmin: user.isAdmin,
          });
        }
      } catch (error) {
        message.error("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await updateUser(id, {
        fullName: values.fullName,
        email: values.email,
        dob: values.dob,
        isAdmin: values.isAdmin,
      });
      message.success("Cập nhật người dùng thành công");
      navigate("/admin/table-user");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Cập nhật người dùng thất bại",
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card title="Cập nhật người dùng" style={{ maxWidth: 600 }}>
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

        <Form.Item label="Ngày sinh" name="dob">
          <Input placeholder="DD/MM/YYYY" />
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
            Cập nhật
          </Button>
          <Button onClick={() => navigate("/admin/table-user")}>Quay lại</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
