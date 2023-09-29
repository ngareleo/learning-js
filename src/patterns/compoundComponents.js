import * as React from "react";

const AccordionContext = React.createContext({
  active: 0,
  setActive: () => 0,
});

export const Accordion = (props) => {
  const [active, setActive] = React.useState(0);

  return (
    <AccordionContext.Provider value={{ active, setActive }}>
      <ul>{props.children}</ul>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ item, index }) => {
  const { active, setActive } = React.useContext(AccordionContext);

  return (
    <li
      onClick={() => setActive(index)}
      key={item.id}
      style={{ color: item.key }}
    >
      <strong>{item.label}</strong>
      {index === active && item.content}
    </li>
  );
};

export const CompoundComponentExample = () => {
  return (
    <Accordion>
      <AccordionItem
        item={{ id: "red", content: "the color is red" }}
        index={0}
      />
      <AccordionItem
        item={{ id: "blue", content: "the color is blue" }}
        index={1}
      />
      <br />
      <AccordionItem
        item={{ id: "green", content: "the color is green" }}
        index={2}
      />
    </Accordion>
  );
};
