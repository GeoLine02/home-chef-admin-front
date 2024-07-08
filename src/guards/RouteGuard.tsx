import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IRouteGuard {
  children: ReactNode;
}

const RouteGuard = ({ children }: IRouteGuard) => {
  const navigate = useNavigate();
  const isAuthenticated = true;

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  if (isAuthenticated) return children;
};
export default RouteGuard;
