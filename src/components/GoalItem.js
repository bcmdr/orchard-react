import React from "react";

export default function GoalItem(props) {
  const colorMap = [
    "var(--red)",
    "var(--orange)",
    "var(--green)",
    "var(--blue)",
    "var(--purple)"
  ];
  return (
    <article className={"GoalItem " + (props.done ? "done" : "")}>
      <header style={{ backgroundColor: colorMap[props.index % colorMap.length] }}>
        <h2>{props.title}</h2>
        <div>
          <button
            className="App-button"
            data-index={props.index}
            onClick={props.handleDone}
          >
            Done
          </button>
        </div>
      </header>
      <footer>
        <p className="streak">
          {props.streak} Day{props.streak === 1 ? "" : "s"}
        </p>
        <div>
          <button data-index={props.index} onClick={props.handleRemove}>
            Remove
          </button>
        </div>
      </footer>
    </article>
  );
}
