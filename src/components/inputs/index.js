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
    color: ${props => theme.grays.light};
    background-color: transparent;
    padding: ${props => theme.margins.large}px
      ${props => theme.margins.large * 2}px;
    text-decoration: ${props => (props.focused ? "underline" : "none")};
    display: inline-block;
    font-size: ${props => theme.fontSizes.medium}px;
    font-family: ${props => theme.fontFamilies.interactive};
    transition: ${props => theme.animationLengths.medium / 1000}s;
    border: none;
    &::placeholder {
      color: ${props => theme.modifyColors.desaturate(theme.grays.light)};
    }
  `;

  const ContainerStyled = styled.div`
    border: ${props => theme.borderThickness.medium}px solid
      ${props => theme.colors.primaryMain};
  `;

  const StatusStyled = styled.span`
    font-size: ${props => theme.fontSizes.medium}px;
    padding: ${props => theme.margins.medium}px
      ${props => theme.margins.medium}px;
  `;

  const LabelStyled = styled.label`
    font-size: ${props => theme.fontSizes.medium}px;
    padding: ${props => theme.margins.medium}px
      ${props => theme.margins.medium}px;
    color: ${props => theme.grays.light};
  `;

  const PureView = state => {
    const { value, persistedValue } = state;

    return (
      <div>
        <LabelStyled forhtml={id}>{name}</LabelStyled>
        <ContainerStyled>
          <InputStyled
            type="text"
            value={value}
            onChange={onChange}
            id={id}
            placeholder={persistedValue}
            focused={state.focused}
          />
          <StatusStyled>{value === persistedValue ? "😇" : "😴"}</StatusStyled>
        </ContainerStyled>
      </div>
    );
  };

  const View = makeView({
    viewStateStream: Rx.Observable.combineLatest(
      stateStream,
      epicsStream.startWith(null),
      state => state
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
