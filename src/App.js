import React from "react";
import {
  makeContainer,
  makeButton,
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

  const columnContainer = makeContainer({ direction: "column", theme });
  const rowContainer = makeContainer({ direction: "row", theme });

  const app = { buttons, theme, columnContainer, rowContainer };
  makeChaosMonkey(app);

  window.app = app;

  return () => (
    <columnContainer.View>
      <rowContainer.View>
        {buttons.map((b, i) => (
          <columnContainer.View key={i}>
            <b.View />
          </columnContainer.View>
        ))}
      </rowContainer.View>
      <rowContainer.View>
        <theme.View />
      </rowContainer.View>
    </columnContainer.View>
    // <Column>
    //   <Row>
    //     <theme.View />
    //   </Row>
    //   <Row>
    //     <H1>Planck-state-atoms</H1>
    //   </Row>

    //   <Row>
    //     {buttons.map((b, i) => (
    //       <Column key={i}>
    //         <b.View />
    //       </Column>
    //     ))}
    //   </Row>
    //   <Row>
    //     <H2>Open your terminal</H2>
    //   </Row>
    // </Column>
  );
};
