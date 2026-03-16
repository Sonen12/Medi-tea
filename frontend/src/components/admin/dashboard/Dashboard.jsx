import React, { useMemo, useState } from "react";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = location.pathname.split("/")[2] || "table-user";

  const items = useMemo(
    () => [
      {
        key: "user",
        label: "User",
        children: [
          { label: "Table User", key: "table-user" },
          { label: "Create User", key: "create-user" },
          { label: "Detail User", key: "detail-user" },
          { label: "Update User", key: "update-user" },
        ],
      },
      {
        key: "product",
        label: "Product",
        children: [
          { label: "Table Product", key: "table-product" },
          { label: "Create Product", key: "create-product" },
          { label: "Detail Product", key: "detail-product" },
          { label: "Update Product", key: "update-product" },
        ],
      },
    ],
    [],
  );

  const openKey = useMemo(() => {
    if (selectedKey.includes("user")) return ["user"];
    if (selectedKey.includes("product")) return ["product"];
    return ["user"];
  }, [selectedKey]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="admin-logo">{!collapsed && <span>ADMIN</span>}</div>

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKey}
          onClick={({ key }) => navigate(`/admin/${key}`)}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedKey}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>MediTea xin chào</Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;