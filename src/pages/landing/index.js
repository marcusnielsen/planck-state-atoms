import React from "react";
import {
  H2,
  Card,
  Container,
  TopJumbo,
  Row,
  makeButton
} from "../../components";

export const makeLanding = ({ theme }) => {
  const logout = makeButton({
    theme,
    name: "log out",
    disabled: false,
    style: "secondaryMain"
  });

  logout.actionStreams.push.forEach(() => {
    window.localStorage.setItem("jwt", "");
    window.location.reload();
  });

  const View = () => (
    <Container>
      <TopJumbo theme={theme} />
      <Card theme={theme}>
        <Row theme={theme}>
          <H2 theme={theme}>Landing</H2>
        </Row>
        <Row theme={theme}>
          <logout.View />
        </Row>
      </Card>
    </Container>
  );

  return {
    View
  };
};
