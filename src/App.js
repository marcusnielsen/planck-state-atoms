import React, { Fragment } from "react";
import { makeButtonsStory } from "./components/buttons/story";
import { makeInputsStory } from "./components/inputs/story";
import { makeLayoutsStory } from "./components/layouts/story";
import { makeTextssStory } from "./components/texts/story";

export const makeApp = theme => {
  // return () => (
  //   <columnContainer.View>
  //     <rowContainer.View>
  //       <h1.View>Planck-state-atoms</h1.View>
  //     </rowContainer.View>
  //     <rowContainer.View>
  //       <h2.View>Overpowered stateful components</h2.View>
  //     </rowContainer.View>
  //     <rowContainer.View>
  //       {Object.entries(buttons).map(([key, button]) => (
  //         <columnContainer.View key={key}>
  //           <button.View />
  //         </columnContainer.View>
  //       ))}
  //     </rowContainer.View>
  //     <rowContainer.View>
  //       <input.View />
  //     </rowContainer.View>
  //     <rowContainer.View>
  //       <settings.View />
  //     </rowContainer.View>
  //   </columnContainer.View>
  // );

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
