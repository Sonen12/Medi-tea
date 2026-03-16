import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Image,
  Spin,
  message,
  Card,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  getAllCategories,
} from "../../../services/api";

const { TextArea } = Input;

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProductById(id),
          getAllCategories(),
        ]);
        if (catRes.data?.metadata) {
          setCategories(catRes.data.metadata);
        }
        if (prodRes.data?.metadata?.product) {
          const product = prodRes.data.metadata.product;
          form.setFieldsValue({
            nameProduct: product.nameProduct,
            priceProduct: product.priceProduct,
            discountProduct: product.discountProduct,
            stockProduct: product.stockProduct,
            descriptionProduct: product.descriptionProduct,
            categoryProduct: product.categoryProduct,
          });
          setOldImages(product.imagesProduct || []);
        }
      } catch (error) {
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, form]);

  const removeOldImage = (index) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("nameProduct", values.nameProduct);
      formData.append("priceProduct", values.priceProduct);
      formData.append("discountProduct", values.discountProduct || 0);
      formData.append("stockProduct", values.stockProduct || 0);
      formData.append("descriptionProduct", values.descriptionProduct);
      formData.append("categoryProduct", values.categoryProduct);
      formData.append("metadata", JSON.stringify({}));
      formData.append("oldImagesProduct", JSON.stringify(oldImages));

      fileList.forEach((file) => {
        formData.append("imagesProduct", file.originFileObj);
      });

      await updateProduct(id, formData);
      message.success("Cập nhật sản phẩm thành công");
      navigate("/admin/table-product");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Cập nhật sản phẩm thất bại",
      );
    } finally {
      setSubmitting(false);
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
    <Card title="Cập nhật sản phẩm" style={{ maxWidth: 700 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên sản phẩm"
          name="nameProduct"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá (VNĐ)"
          name="priceProduct"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Nhập giá sản phẩm"
          />
        </Form.Item>

        <Form.Item label="Giảm giá (%)" name="discountProduct">
          <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="0" />
        </Form.Item>

        <Form.Item
          label="Tồn kho"
          name="stockProduct"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="descriptionProduct"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={4} placeholder="Mô tả sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryProduct"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((cat) => (
              <Select.Option key={cat._id} value={cat._id}>
                {cat.nameCategory}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {oldImages.length > 0 && (
          <Form.Item label="Ảnh hiện tại">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {oldImages.map((img, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <Image
                    width={80}
                    height={80}
                    src={img}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                  <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeOldImage(index)}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      borderRadius: "50%",
                      minWidth: 24,
                      width: 24,
                      height: 24,
                      padding: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        )}

        <Form.Item label="Thêm ảnh mới">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            beforeUpload={() => false}
            multiple
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            style={{ marginRight: 8 }}
          >
            Cập nhật
          </Button>
          <Button onClick={() => navigate("/admin/table-product")}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
