import React, { useState, useEffect, useRef } from "react";
import { isToday } from "date-fns";
import Dragula from 'react-dragula';
import "./App.css";
import "./Dragula.css";
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
  const [drake, setDrake] = useState(null)
  const [colorsUpdated, setColorsUpdated] = useState(localStorage.getItem("colorsUpdated") ? true : false);
  const scrollable = useRef();
  const goalListRef = useRef();

  useEffect(() => {
    // Save goal list into local storage.
    localStorage.setItem("goalList", JSON.stringify(goalList));
    goalListRef.current = goalList;
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

  const listRef = useRef(null);
  useEffect(() => {
    scrollable.current = true;
    document.addEventListener('touchmove', handleTouchMove, { passive:false });
    if (drake) return;
    let drakeInit = Dragula([listRef.current], {
      moves: (el, source, handle, sibling) => {
        return handle.classList.contains('drag-handle');
      }
    });
    drakeInit.on('drag', (el, source) => {
      scrollable.current = false;
    })
    drakeInit.on('drop', (el, target) => {
      scrollable.current = true;
      let currentGoalList = goalListRef.current;
      let indices = []
      let newGoalList = [];
      for (let i = 0; i < target.children.length; i++) {
        let child = target.children[i];
        indices.push(child.dataset.index);
      }
      for (let index of indices) {
        newGoalList.push(currentGoalList[index]);
      }
      localStorage.setItem("goalList", JSON.stringify(newGoalList));
    });
    setDrake(drakeInit);
  }, [drake, goalListRef]);

  useEffect(() => {
    if (colorsUpdated) return;
    const colorMap = [
      "red",
      "orange",
      "green",
      "blue",
      "purple"
    ];
    let newGoalList = [];
    goalList.forEach((item, index) => {
      let newItem = item;
      if (!newItem.color) {
        newItem.color = colorMap[index % colorMap.length]; 
      };
      newGoalList.push(newItem);
    });
    setGoalList(newGoalList);
    setColorsUpdated(true);
    localStorage.setItem("colorsUpdated", JSON.stringify(true));
  }, [colorsUpdated, goalList]);

  function toggleNewGoalForm() {
    // Hide or show the 'new goal' input form.
    setFormShown(!formShown);
  }

  function handleNewGoalSubmit(event) {
    event.preventDefault();

    const colorMap = [
      "red",
      "orange",
      "green",
      "blue",
      "purple"
    ];

    // Make sure goal title is not empty.
    if (newGoalTitle) {
      // save a new goal into the goal list in local storage.
      setGoalList([
        ...goalList,
        {
          title: newGoalTitle.trim(),
          streak: 0,
          done: false,
          color: colorMap[(goalList.length) % (colorMap.length)]
        }
      ]);
      localStorage.setItem("goalList", JSON.stringify(goalList));
    }

    // Hide and reset the 'new goal' input form.
    setFormShown(false);
    setNewGoalTitle("");
  }

  function handleTouchMove(event) {
    if (! scrollable.current) {
      event.preventDefault();
    }
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
          ref={listRef}
          setGoalList={setGoalList}
          items={goalList}
          handleDone={handleDone}
          handleRemove={handleRemove}
        ></GoalList>
      </main>
    </div>
  );
}

export default App;
