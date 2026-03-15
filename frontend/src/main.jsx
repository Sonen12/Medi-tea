import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/auth/Register.jsx";
import enUS from "antd/locale/en_US";
import Homepage from "./components/Homepage.jsx";
import LoginPage from "./pages/auth/Login.jsx";
import { ConfigProvider } from "antd";
import About from "./components/homepage/About.jsx";
import AboutPage from "./pages/client/AboutPage.jsx";
import BanchaPage from "./pages/client/BanchaPage.jsx";
import ProductMain from "./components/homepage/ProductMain.jsx";
import Products3DList from "./pages/client/Products3DList.jsx";
import Product3DDetail from "./pages/client/Product3DDetail.jsx";
import TeaMixerBoard from "./components/Game/TeaMixerBoard.jsx";

import ProductList from "./components/homepage/ProductList.jsx";
import Shop from "./pages/client/Shop.jsx";
import CreateUser from "./components/admin/user/CreateUser.jsx";
import DetailUser from "./components/admin/user/DetailUser.jsx";
import TableUser from "./components/admin/user/TableUser.jsx";
import UpdateUser from "./components/admin/user/UpdateUser.jsx";
import CreateProduct from "./components/admin/product/CreateProduct.jsx";
import TableProduct from "./components/admin/product/TableProduct.jsx";
import DetailProduct from "./components/admin/product/DetailProduct.jsx";
import DashBoard from "./components/admin/dashboard/Dashboard.jsx";
import UpdateProduct from "./components/admin/product/UpdateProduct.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "bancha-detail",
        element: <BanchaPage />,
      },
      {
        path: "product-main",
        element: <ProductMain />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  // 3D Experience pages — standalone, no Header/Footer
  {
    path: "/3d-products",
    element: <Products3DList />,
  },
  {
    path: "/3d-products/:id",
    element: <Product3DDetail />,
  },
  // Tea Mixer Game — standalone
  {
    path: "/tea-mixer",
    element: <TeaMixerBoard />,
  },
  // Auth pages — standalone, không có Header/Footer
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin",
    element: <DashBoard />,
    children: [
      { index: true, element: <TableUser /> },

      // USER
      { path: "table-user", element: <TableUser /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "detail-user/:id", element: <DetailUser /> },
      { path: "update-user/:id", element: <UpdateUser /> },

      // PRODUCT
      { path: "table-product", element: <TableProduct /> },
      { path: "create-product", element: <CreateProduct /> },
      { path: "detail-product/:id", element: <DetailProduct /> },
      { path: "update-product/:id", element: <UpdateProduct /> },
    ],
  },
]);

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ConfigProvider locale={enUS}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
