import React from "react";
import {
  makeContainer,
  makeInput,
  makeButton,
  makeTheme,
  H1,
  H2,
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

  const buttonDisabledStates = [true, false];

  const buttons = [].concat(
    ...buttonStyles.map(style =>
      buttonDisabledStates.map(disabled =>
        makeButton({
          name: style,
          style: style,
          disabled,
          theme
        })
      )
    )
  );

  const input = makeInput({ theme, id: "abc-123", name: "my input" });

  const columnContainer = makeContainer({ direction: "column", theme });
  const rowContainer = makeContainer({ direction: "row", theme });

  const app = { buttons, input, theme, columnContainer, rowContainer };
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
        {buttons.map((b, i) => (
          <columnContainer.View key={i}>
            <b.View />
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
