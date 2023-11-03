import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { HOCExample } from "./react/patterns/hoc";
import { RenderPropsExample } from "./react/patterns/renderProps";
import { CompoundComponentExample } from "./react/patterns/compoundComponents";

const App = () => {
  return (
    <div>
      <h1>Hello, Traveller</h1>
      <ErrorBoundary fallback={<p>Error</p>}>
        <HOCExample />
      </ErrorBoundary>
      <RenderPropsExample />
      <CompoundComponentExample />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
