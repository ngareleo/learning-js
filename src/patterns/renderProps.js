import * as React from "react";

const WindowSize = (props) => {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return props.render(size);
};

export const RenderPropsExample = () => {
  return (
    <WindowSize
      render={({ width, height }) => (
        <div>
          <h2>
            Your window size is {width} height, {height} width
          </h2>
        </div>
      )}
    />
  );
};
