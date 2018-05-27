import React, { Fragment } from "react";
import { Col, Row } from "./index";

export const makeLayoutsStory = theme => {
  return () => (
    <Fragment>
      <Row theme={theme}>
        <Col theme={theme}>
          <div>Row 1</div>
          <div>Col 1</div>
        </Col>
        <Col theme={theme}>
          <div>Row 1</div>
          <div>Col 2</div>
        </Col>
      </Row>
      <Row theme={theme}>
        <Col theme={theme}>
          <div>Row 2</div>
          <div>Col 1</div>
        </Col>
        <Col theme={theme}>
          <div>Row 2</div>
          <div>Col 2</div>
        </Col>
      </Row>
    </Fragment>
  );
};
