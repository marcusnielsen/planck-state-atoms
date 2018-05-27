import React, { Fragment } from "react";
import { makeInput } from "./index";
import Rx from "rxjs";

export const makeInputsStory = theme => {
  const id = "1";
  const name = "aName";
  const setValueAsyncService = value =>
    Rx.Observable.of({ success: true, body: value })
      .delay(2000)
      .take(1);

  const input = makeInput({ theme, id, name, setValueAsyncService });

  return () => (
    <Fragment>
      <input.View />
    </Fragment>
  );
};
