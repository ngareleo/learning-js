import * as React from "react";
import ReactDOM from "react-dom";
import { HOCExample } from "./patterns/hoc";
import { RenderPropsExample } from "./patterns/renderProps";
import { CompoundComponentExample } from "./patterns/compoundComponents";

const App = () => {
  return (
    <div>
      <h1>Hello, Traveller</h1>
      <HOCExample />
      <RenderPropsExample />
      <CompoundComponentExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
