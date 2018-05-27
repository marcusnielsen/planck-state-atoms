import React, { Fragment } from "react";
import { H1, H2 } from "./index";

export const makeTextssStory = theme => {
  return () => (
    <Fragment>
      <H1 theme={theme}>H1 title</H1>
      <H2 theme={theme}>H2 title</H2>
    </Fragment>
  );
};
