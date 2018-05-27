import { injectGlobal } from "styled-components";
import { darken, lighten, adjustHue, desaturate } from "polished";

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

export const makeTheme = () => ({
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
});
