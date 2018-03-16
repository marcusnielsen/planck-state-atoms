import styled from "styled-components";
import React from "react";
import Rx from "rxjs";
import {
  makeActionSubjects,
  makeStateStream,
  makeView,
  makeEpics
} from "planck-state";

export const makeInput = props => {
  const { theme, id, name, setValueAsyncService } = props;

  const initialState = {
    value: "",
    persistedValue: "",
    error: null,
    loading: null
  };

  const { actions, actionStreams } = makeActionSubjects([
    "setValueAsync",
    "setValueAsyncSucceeded",
    "setValueAsyncFailed",
    "resetValue"
  ]);

  const updaters = {
    resetValue: () => state => ({ ...state, value: state.persistedValue }),
    setValueAsync: value => state => ({ ...state, value, loading: true }),
    setValueAsyncSucceeded: persistedValue => state => ({
      ...state,
      persistedValue,
      error: initialState.error,
      loading: false
    }),
    setValueAsyncFailed: error => state => ({
      ...state,
      error,
      loading: false
    })
  };

  const services = {
    setValueAsync: setValueAsyncService
  };

  const epicsStream = makeEpics({
    actions,
    actionStreams,
    services
  });

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const onChange = domEvent => {
    actions.setValueAsync(domEvent.target.value);
  };

  const InputStyled = styled.input`
    color: ${props => props.theme.grays.light};
    background-color: transparent;
    padding: ${props => props.theme.margins.large}px
      ${props => props.theme.margins.large * 2}px;
    text-decoration: ${props => (props.self.focused ? "underline" : "none")};
    display: inline-block;
    font-size: ${props => props.theme.fontSizes.medium}px;
    font-family: ${props => props.theme.fontFamilies.interactive};
    transition: ${props => props.theme.animationLengths.medium / 1000}s;
    border: none;
    &::placeholder {
      color: ${props =>
        props.theme.modifyColors.desaturate(props.theme.grays.light)};
    }
  `;

  const ContainerStyled = styled.div`
    border: ${props => props.theme.borderThickness.medium}px solid
      ${props => props.theme.colors.primaryMain};
  `;

  const StatusStyled = styled.span`
    font-size: ${props => props.theme.fontSizes.medium}px;
    padding: ${props => props.theme.margins.medium}px
      ${props => props.theme.margins.medium}px;
  `;

  const PureView = props => {
    const { self, theme } = props;
    const { value } = self;

    return (
      <ContainerStyled theme={theme}>
        <InputStyled
          type="text"
          value={value}
          onChange={onChange}
          theme={theme}
          id={id}
          placeholder={name}
          self={self}
        />
        <StatusStyled theme={theme}>
          {self.value === self.persistedValue ? "😇" : "😴"}
        </StatusStyled>
      </ContainerStyled>
    );
  };

  const View = makeView({
    viewStateStream: Rx.Observable.combineLatest(
      stateStream,
      theme.stateStream,
      epicsStream.startWith(null),
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
