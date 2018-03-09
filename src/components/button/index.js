import React from "react";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

export const makeButton = props => {
  const { actions, actionStreams } = makeActionSubjects(["push"]);

  const initialState = {
    count: 0
  };

  const updaters = {
    push: () => state => ({ ...state, count: state.count + 1 })
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const makePureView = ({ props, actions }) => state => (
    <button onClick={actions.push}>{`${props.name}: ${state.count}`}</button>
  );

  const View = makeView({
    actions,
    viewStateStream: stateStream,
    props,
    makePureView
  });

  return {
    actions,
    actionStreams,
    stateStream,
    View
  };
};
