import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createProduct, getAllCategories } from "../../../services/api";

const { TextArea } = Input;

export default function CreateProduct() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.data?.metadata) {
          setCategories(res.data.metadata);
        }
      } catch (error) {
        message.error("Không thể tải danh mục");
      }
    };
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 ảnh sản phẩm");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("nameProduct", values.nameProduct);
      formData.append("priceProduct", values.priceProduct);
      formData.append("discountProduct", values.discountProduct || 0);
      formData.append("stockProduct", values.stockProduct || 0);
      formData.append("descriptionProduct", values.descriptionProduct);
      formData.append("categoryProduct", values.categoryProduct);
      formData.append("metadata", JSON.stringify(values.metadata || {}));

      fileList.forEach((file) => {
        formData.append("imagesProduct", file.originFileObj);
      });

      await createProduct(formData);
      message.success("Tạo sản phẩm thành công");
      navigate("/admin/table-product");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Tạo sản phẩm thất bại",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card title="Thêm sản phẩm mới" style={{ maxWidth: 700 }}>
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
          rules={[{ required: true, message: "Vui lòng nhập số lượng tồn kho" }]}
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

        <Form.Item label="Ảnh sản phẩm">
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
            Tạo sản phẩm
          </Button>
          <Button onClick={() => navigate("/admin/table-product")}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
