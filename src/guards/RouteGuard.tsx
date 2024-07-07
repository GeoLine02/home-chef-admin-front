import { ReactNode } from "react";

interface IRouteGuard {
  children: ReactNode;
}

const RouteGuard = ({ children }: IRouteGuard) => {
  return <div>{children}</div>;
};

export default RouteGuard;
