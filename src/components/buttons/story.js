import React, { Fragment } from "react";
import { makeButton } from "./index";

export const makeButtonsStory = theme => {
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

  return () => (
    <Fragment>
      {Object.entries(buttons).map(([key, button]) => (
        <div key={key} style={{ padding: "15px" }}>
          <button.View />
        </div>
      ))}
    </Fragment>
  );
};
