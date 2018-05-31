import React, { Fragment } from "react";
import { makeLogin } from "./pages/login";
import { makeLanding } from "./pages/landing";
import { Subject } from "rxjs";

export const makeApp = theme => {
  const appMsgStream = new Subject();

  const sendMsg = msg => {
    console.log("sending:", msg);
    ws.send(JSON.stringify(msg));
  };

  const ws = new window.WebSocket("ws://localhost:8182/");

  ws.onmessage = resp => {
    const msg = JSON.parse(resp.data);
    console.log("recieved:", msg);
    appMsgStream.next(msg);
  };

  const login = makeLogin({ theme, appMsgStream, sendMsg });
  const landing = makeLanding({ theme });

  const loginToken = window.localStorage.getItem("jwt");
  const authenticated = loginToken != null && loginToken !== "";
  const Page = authenticated ? landing.View : login.View;

  return () => (
    <Fragment>
      <Page />
    </Fragment>
  );
};
