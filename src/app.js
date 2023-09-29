import * as React from "react";
import ReactDOM from "react-dom";
import { HOCExample } from "./patterns/hoc";

const App = () => {
  return (
    <div>
      <h1>Hello, Traveller</h1>
      <HOCExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
