import { useEffect, useState } from "react";
import { Table, Image, Space, Button, Popconfirm, Tag, message } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct, getAllCategories } from "../../../services/api";

export default function TableProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      if (prodRes.data?.metadata) setProducts(prodRes.data.metadata);
      if (catRes.data?.metadata) setCategories(catRes.data.metadata);
    } catch (error) {
      message.error("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Xóa sản phẩm thành công");
      fetchData();
    } catch (error) {
      message.error("Xóa sản phẩm thất bại");
    }
  };

  const getCategoryName = (catId) => {
    const cat = categories.find((c) => c._id === catId);
    return cat ? cat.nameCategory : "N/A";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imagesProduct",
      key: "image",
      width: 80,
      render: (images) =>
        images && images.length > 0 ? (
          <Image width={50} height={50} src={images[0]} style={{ objectFit: "cover", borderRadius: 4 }} />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
    },
    {
      title: "Giá",
      dataIndex: "priceProduct",
      key: "priceProduct",
      render: (price) => formatPrice(price),
      sorter: (a, b) => a.priceProduct - b.priceProduct,
    },
    {
      title: "Giảm giá",
      dataIndex: "discountProduct",
      key: "discountProduct",
      render: (discount) => (discount > 0 ? <Tag color="green">{discount}%</Tag> : "-"),
    },
    {
      title: "Tồn kho",
      dataIndex: "stockProduct",
      key: "stockProduct",
      sorter: (a, b) => a.stockProduct - b.stockProduct,
      render: (stock) =>
        stock > 0 ? (
          <Tag color="blue">{stock}</Tag>
        ) : (
          <Tag color="red">Hết hàng</Tag>
        ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryProduct",
      key: "categoryProduct",
      render: (catId) => getCategoryName(catId),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/detail-product/${record._id}`)}
          />
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/update-product/${record._id}`)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Quản lý sản phẩm</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/create-product")}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />
    </div>
  );
}
