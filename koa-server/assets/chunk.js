function Sub() {
  const [count, setCount] = React.useState(0);
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement("h3", null, "this is sub page 2"),
    /*#__PURE__*/ React.createElement("div", null, "count: ", count),
    /*#__PURE__*/ React.createElement(
      "button",
      {
        onClick: () => setCount(count + 1),
      },
      "add 1"
    )
  );
}

console.log("Sub chunk loaded!");
