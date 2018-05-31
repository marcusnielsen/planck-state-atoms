import React from "react";
import {
  H2,
  Card,
  Container,
  TopJumbo,
  Row,
  makeInput,
  makeButton
} from "../../components";
import { merge } from "rxjs";
import {
  map,
  filter,
  take,
  withLatestFrom,
  switchMap,
  tap,
  combineLatest
} from "rxjs/operators";
import uuidv4 from "uuid/v4";

export const makeLogin = ({ theme, appMsgStream, sendMsg }) => {
  const username = makeInput({
    theme,
    id: "username",
    name: "username"
  });

  const password = makeInput({
    theme,
    id: "password",
    name: "password"
  });

  const register = makeButton({
    theme,
    name: "Register",
    disabled: false,
    style: "primaryComplement"
  });

  const login = makeButton({
    theme,
    name: "Login",
    disabled: false,
    style: "primaryMain"
  });

  merge(
    login.actionStreams.push.pipe(map(() => "login")),
    register.actionStreams.push.pipe(map(() => "register"))
  )
    .pipe(
      withLatestFrom(
        username.stateStream.pipe(
          combineLatest(password.stateStream, (username, password) => ({
            username: username.value,
            password: password.value
          }))
        )
      ),
      switchMap(([action, body]) => {
        const cid = uuidv4();
        sendMsg({ action, body, cid });
        return appMsgStream.pipe(filter(msg => msg.cid === cid), take(1));
      }),
      tap(msg => {
        if (msg.error) {
          console.error(msg.error);
          return;
        }

        console.log(msg.body.token);
        window.localStorage.setItem("jwt", msg.body);
        window.location.reload();
      })
    )
    .forEach(() => {});

  const View = () => (
    <Container>
      <TopJumbo theme={theme} />
      <Card theme={theme}>
        <Row theme={theme}>
          <H2 theme={theme}>Login</H2>
        </Row>
        <Row theme={theme}>
          <username.View />
          <password.View />
        </Row>
        <TopJumbo theme={theme} />
        <Row theme={theme}>
          <register.View />
          <login.View />
        </Row>
      </Card>
    </Container>
  );

  return {
    View
  };
};
