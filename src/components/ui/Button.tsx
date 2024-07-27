import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $isactive?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 0.6rem;
  border-radius: 2rem;
  border: none;

  ${(props) =>
    props.$isactive &&
    css`
      background-color: var(--color-green-700);
      color: var(--color-white);
    `}

  &:hover {
    background-color: var(--color-green-700);
    color: var(--color-white);
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Button: React.FC<ButtonProps> = ({
  $isactive = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton $isactive={$isactive} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
