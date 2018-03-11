import styled from "styled-components";
import React from "react";

const ContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;

  flex-direction: ${props => props.direction};
  margin: ${props => props.theme.margins.medium}px;
`;

export const Column = props => {
  const { children, theme } = props;

  return (
    <ContainerStyled direction="column" theme={theme}>
      {children}
    </ContainerStyled>
  );
};

export const Row = props => {
  const { children, theme } = props;

  return (
    <ContainerStyled direction="row" theme={theme}>
      {children}
    </ContainerStyled>
  );
};
