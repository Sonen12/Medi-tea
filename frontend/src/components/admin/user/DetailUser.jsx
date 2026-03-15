import { useEffect, useState } from "react";
import { Descriptions, Tag, Button, Spin, message, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../../services/api";

export default function DetailUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        if (res.data?.metadata) {
          setUser(res.data.metadata);
        }
      } catch (error) {
        message.error("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <p>Không tìm thấy người dùng</p>;
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/table-user")}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>
      <Card title="Chi tiết người dùng">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ tên">{user.fullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{user.dob}</Descriptions.Item>
          <Descriptions.Item label="Ngày tham gia">
            {user.date}
          </Descriptions.Item>
          <Descriptions.Item label="Quyền">
            {user.isAdmin ? (
              <Tag color="red">Admin</Tag>
            ) : (
              <Tag color="blue">User</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {new Date(user.createdAt).toLocaleString("vi-VN")}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {new Date(user.updatedAt).toLocaleString("vi-VN")}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
