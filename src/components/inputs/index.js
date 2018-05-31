import styled from "styled-components";
import React from "react";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

export const makeInput = props => {
  const { theme, id, name } = props;

  const initialState = {
    value: ""
  };

  const { actions, actionStreams } = makeActionSubjects(["setValue"]);

  const updaters = {
    setValue: value => state => ({ ...state, value })
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const onChange = domEvent => {
    actions.setValue(domEvent.target.value);
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
    width: 100%;
  `;

  const ContainerStyled = styled.div`
    border: ${props => theme.borderThickness.medium}px solid
      ${props => theme.colors.primaryMain};
    position: relative;
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
        </ContainerStyled>
      </div>
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
