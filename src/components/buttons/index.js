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
    theme.stateStream
      .take(1)
      .flatMap(state =>
        Rx.Observable.of(null).delay(state.animationLengths.medium)
      )
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

  const ButtonStyled = styled.button`
    cursor: pointer;
    background-color: ${props =>
      props.self.pushed
        ? props.theme.modifyColors.darken(props.colorStyle)
        : props.colorStyle};
    border: none;
    color: ${props => props.theme.grays.light};
    padding: ${props => props.theme.margins.large}px
      ${props => props.theme.margins.large * 2}px;
    text-align: center;
    text-decoration: ${props => (props.self.focused ? "underline" : "none")};
    display: inline-block;
    font-size: ${props => props.theme.fontSizes.medium}px;
    font-family: ${props => props.theme.fontFamilies.interactive};
    font-weight: bold;
    transition: ${props => props.theme.animationLengths.medium / 1000}s;
    &:disabled {
      cursor: not-allowed;
      background: ${props =>
        props.theme.modifyColors.desaturate(props.colorStyle)};
    }
  `;

  const PureView = states => {
    const { self, theme } = states;

    const colorStyle = theme.colors[style];

    return (
      <ButtonStyled
        onClick={actions.push}
        onFocus={actions.focus}
        onBlur={actions.blur}
        onMouseEnter={actions.focus}
        onMouseLeave={actions.blur}
        disabled={self.disabled}
        colorStyle={colorStyle}
        theme={theme}
        self={self}
      >
        {name}
      </ButtonStyled>
    );
  };

  const View = makeView({
    viewStateStream: Rx.Observable.combineLatest(
      stateStream,
      theme.stateStream,
      (self, theme) => ({ self, theme })
    ),
    PureView
  });

  return {
    actions,
    actionStreams,
    stateStream,
    View
  };
};
