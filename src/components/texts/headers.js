import styled from "styled-components";

export const H1 = styled.h1`
  color: ${props => props.theme.colors.secondaryComplement};
  font-family: ${props => props.theme.fontFamilies.large};
  font-size: ${props => props.theme.fontSizes.large}px;
  text-transform: uppercase;
`;

export const H2 = styled.h2`
  color: ${props => props.theme.colors.secondaryComplement};
  font-family: ${props => props.theme.fontFamilies.large};
  font-size: ${props => props.theme.fontSizes.medium}px;
  text-transform: uppercase;
`;
