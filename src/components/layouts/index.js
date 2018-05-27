import styled from "styled-components";
import React from "react";

const ContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
  justify-content: space-between;
  margin: ${props => props.theme.margins.medium}px;
`;

export const Row = props => (
  <ContainerStyled direction="row" theme={props.theme}>
    {props.children}
  </ContainerStyled>
);

export const Col = props => (
  <ContainerStyled direction="column" theme={props.theme}>
    {props.children}
  </ContainerStyled>
);
