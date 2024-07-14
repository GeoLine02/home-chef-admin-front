import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const StyledSidebar = styled.nav`
  display: grid;
  grid-template-columns: 20rem 1fr;
`;

const Main = styled.main``;

const AppLayout = () => {
  return (
    <StyledSidebar>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledSidebar>
  );
};

export default AppLayout;
