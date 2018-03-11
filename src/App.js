import React from "react";
import Rx from "rxjs";
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

  window.app = { buttons, theme };

  const actions = [].concat(...buttons.map(b => Object.values(b.actions)));

  Rx.Observable.interval(2000).forEach(() => {
    const actionIndex = Math.floor(Math.random() * actions.length);
    actions[actionIndex]();
  });

  const actionStreams = [].concat(
    ...buttons.map((b, i) =>
      Object.entries(b.actionStreams).map(([key, val]) =>
        val.map(() => `${buttonStyles[i]}#${key}`)
      )
    )
  );

  Rx.Observable.merge(...actionStreams).forEach(data => console.log(data));

  return () => (
    <Column theme={theme}>
      <Row theme={theme}>
        <H1 theme={theme}>Open your terminal</H1>
      </Row>
      <Row theme={theme}>{buttons.map((b, i) => <b.View key={i} />)}</Row>
    </Column>
  );
};
