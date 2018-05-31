import React, { Fragment } from "react";
import { makeButtonsStory } from "./components/buttons/story";
import { makeInputsStory } from "./components/inputs/story";
import { makeLayoutsStory } from "./components/layouts/story";
import { makeTextssStory } from "./components/texts/story";

export const makeApp = theme => {
  const ButtonStory = makeButtonsStory(theme);
  const InputStory = makeInputsStory(theme);
  const LayoutsStory = makeLayoutsStory(theme);
  const TextsStory = makeTextssStory(theme);

  return () => (
    <Fragment>
      <ButtonStory />
      <InputStory />
      <LayoutsStory />
      <TextsStory />
    </Fragment>
  );
};
