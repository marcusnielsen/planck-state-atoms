import React from "react";
import Rx from "rxjs";
import styled from "styled-components";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

export const makeButton = props => {
  const { name, theme, disabled, style } = props;

  const initialState = {
    disabled,
    pushed: false,
    focused: false
  };

  const { actions, actionStreams: baseActionStreams } = makeActionSubjects([
    "push",
    "enable",
    "disable",
    "focus",
    "blur"
  ]);

  const unpushActionStream = baseActionStreams.push.switchMap(() =>
    Rx.Observable.of(null).delay(theme.animationLengths.medium)
  );

  const actionStreams = {
    ...baseActionStreams,
    unpush: unpushActionStream
  };

  const updaters = {
    enable: () => state => ({ ...state, disabled: false }),
    disable: () => state => ({ ...state, disabled: true }),
    push: () => state => (state.disabled ? state : { ...state, pushed: true }),
    unpush: () => state => ({ ...state, pushed: false }),
    focus: () => state =>
      state.disabled ? state : { ...state, focused: true },
    blur: () => state => ({ ...state, focused: false })
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const colorStyle = theme.colors[style];

  const ButtonStyled = styled.button`
    cursor: pointer;
    background-color: ${props =>
      props.pushed ? theme.modifyColors.lighten(colorStyle) : colorStyle};
    border: none;
    color: ${theme.grays.light};
    padding: ${theme.margins.large}px ${theme.margins.large * 2}px;
    text-align: center;
    text-decoration: ${props => (props.focused ? "underline" : "none")};
    display: inline-block;
    font-size: ${theme.fontSizes.medium}px;
    font-family: ${theme.fontFamilies.interactive};
    font-weight: bold;
    transition: ${theme.animationLengths.medium / 1000}s;
    &:disabled {
      cursor: not-allowed;
      background: ${theme.modifyColors.desaturate(colorStyle)};
    }
  `;

  const PureView = state => (
    <ButtonStyled
      onClick={actions.push}
      onFocus={actions.focus}
      onBlur={actions.blur}
      onMouseEnter={actions.focus}
      onMouseLeave={actions.blur}
      {...state}
    >
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
