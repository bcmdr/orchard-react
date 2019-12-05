import React, { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import './App.css';
import GoalList from './components/GoalList'
import NewGoalModal from './components/NewGoalModal'

function App() {
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [goalList, setGoalList] = useState(
    localStorage.getItem('goalList') ? JSON.parse(localStorage.getItem('goalList')) : []
  );
  const [lastReset, setLastReset] = useState(() => {
    const lastReset = localStorage.getItem('lastReset');
    return lastReset ? new Date(JSON.parse(lastReset)) : new Date();
  });
  const [formShown, setFormShown] = useState(false);

  useEffect(() => {
    localStorage.setItem('goalList', JSON.stringify(goalList))
  }, [goalList]);

  useEffect(() => {
    if (isToday(lastReset)) return;

    let newGoalList = [...goalList];
    newGoalList.forEach((item) => {
      item.done = false;
    });
    setGoalList(newGoalList);

    const newLastReset = new Date();

    localStorage.setItem('lastReset', JSON.stringify(newLastReset));
    setLastReset(newLastReset);
  }, [lastReset, goalList]);

  function toggleNewGoalForm() {
    setFormShown(!formShown);
  }

  function handleNewGoalSubmit(event) {
    event.preventDefault();
    setGoalList([...goalList, {
      title: newGoalTitle,
      streak: 0, 
      done: false,
    }]);
    localStorage.setItem('goalList', JSON.stringify(goalList));
    setFormShown(false);
    setNewGoalTitle("");
  }

  function handleNewGoalTitle(event) {
    setNewGoalTitle(event.target.value);
  }

  function handleDone(event) {
    const id = event.target.dataset.index;
    let newGoalList = [...goalList];

    if (newGoalList[id].done) {
      newGoalList[id].done = false;
      if (isToday(lastReset)) newGoalList[id].streak -= 1;
    } else {
      newGoalList[id].done = true;
      newGoalList[id].streak += 1;
    }

    setGoalList(newGoalList);
  }

  function handleRemove(event) {
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
            <button className="App-button" onClick={toggleNewGoalForm}>New Goal</button>
          </div>
        </section>
        <NewGoalModal 
          shown={formShown} 
          title={newGoalTitle}
          handleChange={handleNewGoalTitle} 
          handleSubmit={handleNewGoalSubmit}></NewGoalModal>
      </header>
      <main>
        <GoalList 
          items={goalList} 
          handleDone={handleDone}
          handleRemove={handleRemove}></GoalList>
      </main>
    </div>
  );
}

export default App;
