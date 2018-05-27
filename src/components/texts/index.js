import React from "react";
import styled from "styled-components";

const H1Styled = styled.h1`
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondaryComplement};
  font-family: ${props => props.theme.fontFamilies.large};
  font-size: ${props => props.theme.fontSizes.large}px;
`;

export const H1 = props => (
  <H1Styled theme={props.theme}>{props.children}</H1Styled>
);

const H2Styled = styled.h2`
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondaryComplement};
  font-family: ${props => props.theme.fontFamilies.large};
  font-size: ${props => props.theme.fontSizes.medium}px;
`;

export const H2 = props => (
  <H2Styled theme={props.theme}>{props.children}</H2Styled>
);
