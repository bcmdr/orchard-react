import React, { useState, useEffect } from 'react';
import { isToday, parseISO } from 'date-fns';
import './App.css';
import GoalList from './components/GoalList'
import NewGoalModal from './components/NewGoalModal'

function App() {
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [goalList, setGoalList] = useState(
    localStorage.getItem('goalList') ? JSON.parse(localStorage.getItem('goalList')) : []
  );
  const [lastReset, setLastReset] = useState(
    localStorage.getItem('lastReset') ? new Date(JSON.parse(localStorage.getItem('lastReset'))) : new Date()
  )
  const [formShown, setFormShown] = useState(false)

  useEffect(() => {
    localStorage.setItem('goalList', JSON.stringify(goalList))
  }, [goalList]);

  useEffect(() => {
    if (isToday(lastReset)) return

    let newGoalList = [...goalList];
    newGoalList.forEach((item) => {
      item.done = false;
    });
    setGoalList(newGoalList);

    localStorage.setItem('lastReset', JSON.stringify(new Date()));
    setLastReset(new Date());
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
      lastDone: null,
      nextDone: null,
    }]);
    localStorage.setItem('goalList', JSON.stringify(goalList))
    setFormShown(false);
    setNewGoalTitle("");
  }

  function handleNewGoalTitle(event) {
    setNewGoalTitle(event.target.value);
  }

  function handleDone(event) {
    const id = event.target.dataset.index;
    let newGoalList = [...goalList];

    newGoalList[id].done = !goalList[id].done;

    if (!isToday(parseISO(newGoalList[id].lastDone)) && newGoalList[id].done) {
      newGoalList[id].streak += 1;
      newGoalList[id].nextDone = new Date();
    } else {
      newGoalList[id].streak -= 1;
      newGoalList[id].nextDone = newGoalList[id].lastDone;
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
