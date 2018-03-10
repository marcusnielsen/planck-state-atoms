import React from "react";
import {
  Column,
  Row,
  makeButton,
  H1,
  makeTheme,
  injectGlobalStyle
} from "./components";

export const makeApp = () => {
  injectGlobalStyle();
  const theme = makeTheme();

  const buttons = [
    "primaryMain",
    "secondaryMain",
    "primaryComplement",
    "secondaryComplement"
  ].map(style =>
    makeButton({
      name: style,
      style: style,
      theme
    })
  );

  window.app = { buttons, theme };

  setInterval(buttons.map(b => Object.values(b.actions)));

  return () => (
    <Column theme={theme}>
      <Row theme={theme}>
        <H1 theme={theme}>H1 title</H1>
      </Row>
      <Row theme={theme}>{buttons.map(b => <b.View />)}</Row>
    </Column>
  );
};
