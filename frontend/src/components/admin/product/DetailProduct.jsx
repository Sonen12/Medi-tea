import { useEffect, useState } from "react";
import { Descriptions, Image, Tag, Button, Spin, message, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getAllCategories } from "../../../services/api";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProductById(id),
          getAllCategories(),
        ]);
        if (prodRes.data?.metadata?.product) {
          setProduct(prodRes.data.metadata.product);
        }
        if (catRes.data?.metadata) {
          setCategories(catRes.data.metadata);
        }
      } catch (error) {
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/table-product")}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>
      <Card title="Chi tiết sản phẩm">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên sản phẩm">
            {product.nameProduct}
          </Descriptions.Item>
          <Descriptions.Item label="Giá">
            {formatPrice(product.priceProduct)}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá">
            {product.discountProduct > 0 ? (
              <Tag color="green">{product.discountProduct}%</Tag>
            ) : (
              "Không"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Tồn kho">
            {product.stockProduct > 0 ? (
              <Tag color="blue">{product.stockProduct}</Tag>
            ) : (
              <Tag color="red">Hết hàng</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            {getCategoryName(product.categoryProduct)}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {product.descriptionProduct}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh sản phẩm">
            <Image.PreviewGroup>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.imagesProduct?.map((img, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={img}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {new Date(product.createdAt).toLocaleString("vi-VN")}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
