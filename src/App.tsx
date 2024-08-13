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
import RestaurantEdit from "./pages/restaurants/RestaurantEdit.tsx";
import UserCreate from "./pages/users/UserCreate.tsx";
import UserList from "./pages/users/UserList.tsx";
import UserEdit from "./pages/users/UserEdit.tsx";

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
        path: "/restaurants/update/:id",
        element: <RestaurantEdit />,
      },
      {
        path: "/products/list",
        element: <ProductList />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
      },
      {
        path: "/users/list",
        element: <UserList />,
      },
      {
        path: "/users/create",
        element: <UserCreate />,
      },
      {
        path: "/users/update/:id",
        element: <UserEdit />,
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
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
