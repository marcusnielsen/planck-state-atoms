import styled from "styled-components";

export const H1 = styled.h1`
  color: ${props => props.theme.grays.light};
  font-family: ${props => props.theme.fontFamilies.large};
  font-size: ${props => props.theme.fontSizes.large}px;
  text-transform: uppercase;
`;
