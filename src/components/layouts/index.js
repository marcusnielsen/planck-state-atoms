import styled from "styled-components";
import React from "react";

const FlexStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
  justify-content: space-between;
  margin: ${props => props.theme.margins.medium}px;
`;

export const Row = props => (
  <FlexStyled direction="row" theme={props.theme}>
    {props.children}
  </FlexStyled>
);

export const Col = props => (
  <FlexStyled direction="column" theme={props.theme}>
    {props.children}
  </FlexStyled>
);

const ContainerStyled = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export const TopMedium = styled.div`
  margin-top: ${({ theme }) => theme.margins.medium}px;
`;

export const TopLarge = styled.div`
  margin-top: ${({ theme }) => theme.margins.large}px;
`;

export const TopJumbo = styled.div`
  margin-top: ${({ theme }) => theme.margins.jumbo}px;
`;

export const Container = props => (
  <ContainerStyled>{props.children}</ContainerStyled>
);
