import React from "react";
import ReactDOM from "react-dom";
import { makeApp } from "./app";
import registerServiceWorker from "./registerServiceWorker";

const App = makeApp();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
