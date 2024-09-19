import * as React from "react";

const BasicList = (props) => {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

function withAsync(Component) {
  const C = (props) => {
    if (props.loading) {
      return <h2>We are cookin&apos;</h2>;
    }

    if (props.error) {
      return props.error;
    }

    return <Component {...props} />;
  };

  return C;
}

const UniversitiesList = withAsync(BasicList);

export const HOCExample = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=Kenya")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data.map((i) => i.name));
      })
      .catch((e) => setError(e));
  }, []);

  return <UniversitiesList loading={isLoading} error={error} items={data} />;
};
