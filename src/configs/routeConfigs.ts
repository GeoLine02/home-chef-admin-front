import { RxDashboard } from "react-icons/rx";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const routeConfigs = [
  {
    path: "/users",
    title: "users",
    icon: FaRegUser,
    translateKey: "users",
    subMenu: [
      {
        path: "/users/list",
        title: "list",
        translateKey: "users.list",
      },
      {
        path: "/users/create",
        title: "create",
        translateKey: "users.create",
      },
    ],
  },
  {
    path: "/restaurants",
    title: "restaurants",
    icon: RxDashboard,
    translateKey: "restaurants",
    subMenu: [
      {
        path: "/restaurants/list",
        title: "list",
        translateKey: "restaurants.list",
      },
      {
        path: "/restaurants/create",
        title: "create",
        translateKey: "restaurants.create",
      },
    ],
  },
  {
    path: "/products",
    title: "products",
    icon: IoFastFoodOutline,
    translateKey: "products",
    subMenu: [
      {
        path: "/products/list",
        title: "list",
        translateKey: "products.list",
      },
      {
        path: "/products/create",
        title: "create",
        translateKey: "products.create",
      },
    ],
  },
];

export default routeConfigs;
