import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AppLayout from "./components/layouts/AppLayout";
import RouteGuard from "./guards/RouteGuard";
import RestaurantList from "./pages/restaurants/RestaurantList.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProductCreate from "./pages/products/ProductCreate.tsx";
import ProductList from "./pages/products/ProductList.tsx";
import "./App.css";
import RestaurantNew from "./pages/restaurants/RestaurantNew.tsx";

const router = createBrowserRouter([
  {
    element: (
      <RouteGuard>
        <AppLayout />
      </RouteGuard>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/restaurants/list",
        element: <RestaurantList />,
      },
      {
        path: "/restaurants/create",
        element: <RestaurantNew />,
      },
      {
        path: "/products/list",
        element: <ProductList />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}
export default App;
