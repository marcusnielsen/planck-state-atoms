import React from "react";
import styled from "styled-components";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

export const makeButton = props => {
  const { name, theme, disabled, style } = props;

  const { actions, actionStreams } = makeActionSubjects([
    "push",
    "enable",
    "disable"
  ]);

  const initialState = {
    disabled
  };

  const updaters = {
    enable: () => state => ({ ...state, disabled: false }),
    disable: () => state => ({ ...state, disabled: true }),
    push: () => state => state
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const colorStyle = theme.colors[style];

  const ButtonStyled = styled.button`
    cursor: pointer;
    background-color: ${colorStyle};
    border: none;
    color: ${theme.grays.light};
    padding: ${theme.margins.large}px ${theme.margins.large * 2}px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${theme.fontSizes.medium}px;
    font-family: ${theme.fontFamilies.interactive};
    font-weight: bold;
    transition: ${theme.animationLengths.medium / 1000}s;
    &:hover,
    &:focus {
      background: ${theme.modifyColors.darken(colorStyle)};
    }
    &:active {
      background: ${theme.modifyColors.lighten(colorStyle)};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${theme.modifyColors.desaturate(colorStyle)};
    }
  `;

  const PureView = state => (
    <ButtonStyled onClick={actions.push} disabled={state.disabled}>
      {name}
    </ButtonStyled>
  );

  const View = makeView({
    actions,
    viewStateStream: stateStream,
    props,
    PureView
  });

  return {
    actions,
    actionStreams,
    stateStream,
    View
  };
};
