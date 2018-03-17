import React from "react";
import Rx from "rxjs";
import {
  makeContainer,
  makeInput,
  makeButton,
  makeTheme,
  H1,
  H2,
  injectGlobalStyle
} from "./components";
import { makeChaosMonkey } from "./components/chaos-monkey";

export const makeApp = () => {
  injectGlobalStyle();
  const theme = makeTheme();

  const buttonStyles = [
    "primaryMain",
    "secondaryMain",
    "primaryComplement",
    "secondaryComplement"
  ];

  const buttonDisabledStates = [true, false];

  const buttons = buttonStyles.reduce((acc, style) => {
    Object.assign(
      acc,
      buttonDisabledStates.reduce((innerAcc, disabled) => {
        innerAcc[`${style}_${disabled}`] = makeButton({
          name: style,
          style: style,
          disabled,
          theme
        });
        return innerAcc;
      }, {})
    );
    return acc;
  }, {});

  const input = makeInput({
    theme,
    id: "abc-123",
    name: "my input",
    setValueAsyncService: value =>
      Rx.Observable.of({ success: true, body: value })
        .delay(2000)
        .take(1)
  });

  const columnContainer = makeContainer({ direction: "column", theme });
  const rowContainer = makeContainer({ direction: "row", theme });

  const app = {
    actions: {},
    actionStreams: {},
    actionDefinitions: {},
    children: { ...buttons, input, theme, columnContainer, rowContainer }
  };

  makeChaosMonkey(app);

  window.app = app;

  return () => (
    <columnContainer.View>
      <rowContainer.View>
        <H1>Planck-state-atoms</H1>
      </rowContainer.View>
      <rowContainer.View>
        <H2>Open your terminal</H2>
      </rowContainer.View>
      <rowContainer.View>
        {Object.entries(buttons).map(([key, button]) => (
          <columnContainer.View key={key}>
            <button.View />
          </columnContainer.View>
        ))}
      </rowContainer.View>
      <rowContainer.View>
        <input.View />
      </rowContainer.View>
      <rowContainer.View>
        <theme.View />
      </rowContainer.View>
    </columnContainer.View>
  );
};
