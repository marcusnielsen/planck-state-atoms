import React, { Fragment } from "react";
import { makeInput } from "./index";
import { of } from "rxjs";
import { delay, take } from "rxjs/operators";

export const makeInputsStory = theme => {
  const id = "1";
  const name = "aName";
  const setValueAsyncService = value =>
    of({ success: true, body: value }).pipe(delay(2000), take(1));

  const input = makeInput({ theme, id, name, setValueAsyncService });

  return () => (
    <Fragment>
      <input.View />
    </Fragment>
  );
};
