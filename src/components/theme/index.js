import React from "react";
import styled from "styled-components";
import { injectGlobal } from "styled-components";
import { darken, lighten, adjustHue, desaturate } from "polished";
import { makeActionSubjects, makeStateStream, makeView } from "planck-state";

export const injectGlobalStyle = () =>
  injectGlobal`
    body {
        margin: 0;
        padding: 0;
        font-family: "Montserrat", "Trebuchet MS", Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        background-color: #303036;
    }
    * {
	    box-sizing: border-box;
    }
    `;

export const makeTheme = () => {
  const initialState = {
    animationLengths: {
      medium: 200
    },
    borderThickness: {
      medium: 3
    },
    fontFamilies: {
      interactive: '"Montserrat", "Trebuchet MS", Helvetica, sans-serif',
      large: "Georgia"
    },
    fontSizes: {
      medium: 20,
      large: 50
    },
    margins: {
      medium: 5,
      large: 15
    },
    colors: {
      primaryMain: "#4caf50",
      secondaryMain: adjustHue(90, "#4caf50"),
      primaryComplement: adjustHue(180, "#4caf50"),
      secondaryComplement: adjustHue(270, "#4caf50")
    },
    grays: {
      light: "#fff",
      dark: "#000"
    },
    modifyColors: {
      darken: c => darken(0.15, c),
      lighten: c => lighten(0.15, c),
      desaturate: c => desaturate(0.3, c)
    }
  };

  const { actions, actionStreams } = makeActionSubjects([
    "setBaseAnimationLength"
  ]);

  const updaters = {
    setBaseAnimationLength: medium => state => ({
      ...state,
      animationLengths: { ...state.animationLengths, medium }
    })
  };

  const stateStream = makeStateStream({
    initialState,
    updaters,
    actionStreams
  });

  const PureView = state => {
    const ThemeStyled = styled.pre`
      color: ${state.grays.light};
    `;

    return <ThemeStyled>{JSON.stringify(state, null, 2)}</ThemeStyled>;
  };

  const View = makeView({
    viewStateStream: stateStream,
    PureView
  });

  const actionDefinitions = {
    setBaseAnimationLength: { type: "integer", from: 0, to: 10000 }
  };

  return {
    actions,
    actionStreams,
    actionDefinitions,
    stateStream,
    View
  };
};
