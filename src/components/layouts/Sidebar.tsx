import { NavLink } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";
import { useState } from "react";
import Button from "../ui/Button";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 1rem;
  padding: 0 2rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-top: 0.8rem;
  padding: 0.5rem 1.5rem;
  border-radius: 2.4rem;
  background-color: var(--color-green-100);

  &:active,
  &:hover,
  &.active:link,
  &.active:visited {
    background-color: var(--color-green-500);
    color: var(--color-white);
  }
`;

const Logo = styled.div`
  align-self: center;
  width: 4rem;

  & img {
    width: 100%;
  }
`;

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<string | null>(null);

  function handleToggleSubMenu(translateKey: string) {
    setIsCollapsed((prevKey) =>
      prevKey === translateKey ? null : translateKey
    );
  }

  return (
    <NavList>
      <Logo>
        <img src="../../../public/vite.svg" alt="logo" />
      </Logo>
      {routeConfigs.map((route) => {
        const { icon, title, subMenu, translateKey } = route;
        const Icon = icon;
        return (
          <div key={translateKey}>
            <Button
              onClick={() => handleToggleSubMenu(translateKey)}
              $isactive={isCollapsed === translateKey}
            >
              <div>
                {title} <span>{<Icon size={20} />}</span>
              </div>
            </Button>
            {isCollapsed === translateKey &&
              subMenu?.map((subRoute) => {
                const { path, title, translateKey } = subRoute;
                return (
                  <StyledNavLink to={path} key={translateKey}>
                    <span>{title}</span>
                  </StyledNavLink>
                );
              })}
          </div>
        );
      })}
    </NavList>
  );
}

export default Sidebar;
