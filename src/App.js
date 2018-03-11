import React from "react";
import {
  Column,
  Row,
  makeButton,
  H1,
  H2,
  makeTheme,
  injectGlobalStyle
} from "./components";
import { makeChaosMonkey } from "./chaos-monkey";

export const makeApp = () => {
  injectGlobalStyle();
  const theme = makeTheme();

  const buttonStyles = [
    "primaryMain",
    "secondaryMain",
    "primaryComplement",
    "secondaryComplement"
  ];

  const buttons = buttonStyles.map(style =>
    makeButton({
      name: style,
      style: style,
      disabled: false,
      theme
    })
  );

  makeChaosMonkey({ buttons, buttonStyles });

  window.app = { buttons, theme };

  return () => (
    <Column theme={theme}>
      <Row theme={theme}>
        <H1 theme={theme}>Planck-state-atoms</H1>
      </Row>

      <Row theme={theme}>{buttons.map((b, i) => <b.View key={i} />)}</Row>
      <Row theme={theme}>
        <H2 theme={theme}>Open your terminal</H2>
      </Row>
    </Column>
  );
};
