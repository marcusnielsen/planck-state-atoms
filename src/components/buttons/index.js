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

  const ButtonStyled = styled.button`
    cursor: pointer;
    background-color: ${props =>
      props.self.pushed
        ? theme.modifyColors.darken(props.colorStyle)
        : props.colorStyle};
    border: none;
    color: ${props => theme.grays.light};
    padding: ${props => theme.margins.large}px
      ${props => theme.margins.large * 2}px;
    text-align: center;
    text-decoration: ${props => (props.self.focused ? "underline" : "none")};
    display: inline-block;
    font-size: ${props => theme.fontSizes.medium}px;
    font-family: ${props => theme.fontFamilies.interactive};
    font-weight: bold;
    transition: ${props => theme.animationLengths.medium / 1000}s;
    &:disabled {
      cursor: not-allowed;
      background: ${props => theme.modifyColors.desaturate(props.colorStyle)};
    }
  `;

  const onClick = () => actions.push();
  const onFocus = () => actions.focus();
  const onBlur = () => actions.blur();

  const PureView = state => {
    const colorStyle = theme.colors[style];

    return (
      <ButtonStyled
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        disabled={state.disabled}
        colorStyle={colorStyle}
        self={state}
      >
        {name}
      </ButtonStyled>
    );
  };

  const View = makeView({
    viewStateStream: stateStream,
    PureView
  });

  return {
    actions,
    actionStreams,
    stateStream,
    View
  };
};
