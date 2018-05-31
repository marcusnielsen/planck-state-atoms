import React from "react";
import ReactDOM from "react-dom";
import { makeApp } from "./app";
// import { makeApp } from "./stories";
import registerServiceWorker from "./registerServiceWorker";
import { makeTheme, injectGlobalStyle } from "./components";

const theme = makeTheme();
const App = makeApp(theme);

injectGlobalStyle();
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
