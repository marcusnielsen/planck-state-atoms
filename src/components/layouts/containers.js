import styled from "styled-components";
import React from "react";
import Rx from "rxjs";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

const ContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;

  flex-direction: ${props => props.direction};
  margin: ${props => props.theme.margins.medium}px;
`;

export const makeContainer = props => {
  const { theme, direction } = props;

  const initialState = { direction };

  const { actions, actionStreams } = makeActionSubjects([
    "setDirectionToRow",
    "setDirectionToColumn"
  ]);

  const updaters = {
    setDirectionToRow: () => state => ({ ...state, direction: "row" }),
    setDirectionToColumn: () => state => ({ ...state, direction: "column" })
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const PureView = props => (
    <ContainerStyled direction={props.self.direction} theme={props.theme}>
      {props.children}
    </ContainerStyled>
  );

  const View = makeView({
    viewStateStream: Rx.Observable.combineLatest(
      stateStream,
      theme.stateStream,
      (self, theme) => ({ self, theme })
    ),
    PureView
  });

  const actionDefinitions = {
    setDirectionToRow: { type: "undefined" },
    setDirectionToColumn: { type: "undefined" }
  };

  return {
    actions,
    actionStreams,
    actionDefinitions,
    stateStream,
    View
  };
};

export const Column = props => {
  const { children, theme } = props;

  return (
    <ContainerStyled direction="column" theme={theme}>
      {children}
    </ContainerStyled>
  );
};

export const Row = props => {
  const { children, theme } = props;

  return (
    <ContainerStyled direction="row" theme={theme}>
      {children}
    </ContainerStyled>
  );
};
