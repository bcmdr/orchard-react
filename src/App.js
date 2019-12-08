import React, { useState, useEffect } from "react";
import { isToday } from "date-fns";
import "./App.css";
import GoalList from "./components/GoalList";
import NewGoalModal from "./components/NewGoalModal";

function App() {
  const [newGoalTitle, setNewGoalTitle] = useState("");

  const [formShown, setFormShown] = useState(false);

  const [goalList, setGoalList] = useState(() => {
    // Get the goal list from local storage, otherwise create an empty one.
    let goalList = localStorage.getItem("goalList");
    return goalList ? JSON.parse(localStorage.getItem("goalList")) : [];
  });

  const [lastReset, setLastReset] = useState(() => {
    // Get the last reset date from storage, otherwise set to today.
    const lastReset = localStorage.getItem("lastReset");
    return lastReset ? new Date(JSON.parse(lastReset)) : new Date();
  });

  useEffect(() => {
    // Save goal list into local storage.
    localStorage.setItem("goalList", JSON.stringify(goalList));
  }, [goalList]);

  useEffect(() => {
    // Check if the goals were reset today.
    if (isToday(lastReset)) return;

    // If they weren't,
    // copy the goals into a new list and set all status to 'not done'.
    let newGoalList = [...goalList];
    newGoalList.forEach(item => {
      item.done = false;
    });
    setGoalList(newGoalList);

    // Save into local storage that the resets have occured today.
    const newLastReset = new Date();
    localStorage.setItem("lastReset", JSON.stringify(newLastReset));
    setLastReset(newLastReset);
  }, [lastReset, goalList]);

  function toggleNewGoalForm() {
    // Hide or show the 'new goal' input form.
    setFormShown(!formShown);
  }

  function handleNewGoalSubmit(event) {
    event.preventDefault();

    // Make sure goal title is not empty.
    if (newGoalTitle) {
      // save a new goal into the goal list in local storage.
      setGoalList([
        ...goalList,
        {
          title: newGoalTitle.trim(),
          streak: 0,
          done: false
        }
      ]);
      localStorage.setItem("goalList", JSON.stringify(goalList));
    }

    // Hide and reset the 'new goal' input form.
    setFormShown(false);
    setNewGoalTitle("");
  }

  function handleNewGoalTitle(event) {
    // Save the user's goal title into react's state.
    setNewGoalTitle(event.target.value);
  }

  function handleDone(event) {
    // Get the index of the goal chosen as 'done'.
    const id = event.target.dataset.index;
    let newGoalList = [...goalList];

    // If goal is currently done, mark as 'not done' and decrement the streak counter.
    if (newGoalList[id].done) {
      newGoalList[id].done = false;
      // Decrement the counter only if the goals have been reset today,
      // otherwise this interaction will be discarded.
      if (isToday(lastReset)) newGoalList[id].streak -= 1;
    } else {
      // Mark this 'not done' goal as done and increment the streak counter.
      newGoalList[id].done = true;
      newGoalList[id].streak += 1;
    }

    // Save the goal list.
    setGoalList(newGoalList);
  }

  function handleRemove(event) {
    // Make sure user clicked on purpose.
    const confirmed = window.confirm(
      "Are you sure you would like to remove this goal?"
    );
    if (!confirmed) return;

    // Remove the goal from the list and save this new list.
    const id = event.target.dataset.index;
    let newGoalList = [...goalList];
    newGoalList.splice(id, 1);
    setGoalList(newGoalList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <section className="top-bar">
          <h1>Daily Goals</h1>
          <div>
            <button className="App-button" onClick={toggleNewGoalForm}>
              New Goal
            </button>
          </div>
        </section>
        <NewGoalModal
          shown={formShown}
          title={newGoalTitle}
          handleChange={handleNewGoalTitle}
          handleSubmit={handleNewGoalSubmit}
        ></NewGoalModal>
      </header>
      <main>
        <GoalList
          items={goalList}
          handleDone={handleDone}
          handleRemove={handleRemove}
        ></GoalList>
      </main>
    </div>
  );
}

export default App;
