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
    <article data-index={props.index} className={"width-wrapper GoalItem " + (props.done ? "done" : "")}>
      <header style={{ backgroundColor: !props.color ? colorMap[props.index % colorMap.length] : `var(--${props.color})` }}>
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
        <div className="justify-space-between">
          <svg className="drag-icon drag-handle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          <p className="streak">
            {props.streak} Day{props.streak === 1 ? "" : "s"}
          </p>
        </div>
        <div>
          <button data-index={props.index} onClick={props.handleRemove}>
            Remove
          </button>
        </div>
      </footer>
    </article>
  );
}
