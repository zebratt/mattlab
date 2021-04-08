import React from "react";
import ReactDOM from "react-dom";
import Button from 'app2/Button'

function App() {
  return (
    <div>
      <h1>App 1</h1>
      <Button />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));