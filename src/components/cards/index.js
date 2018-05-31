import React from "react";
import styled from "styled-components";

const CardStyled = styled.div`
  border: ${({ theme }) => theme.borderThickness.medium}px solid
    ${({ theme }) =>
      theme.modifyColors.lighten(theme.modifyColors.lighten(theme.grays.dark))};

  padding: ${({ theme }) => theme.margins.medium}px;
  background: ${({ theme }) => theme.modifyColors.lighten(theme.grays.dark)};
`;

export const Card = props => (
  <CardStyled theme={props.theme}>{props.children}</CardStyled>
);
