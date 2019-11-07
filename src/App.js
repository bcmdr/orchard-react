import React, { useState, useEffect } from 'react';
import './App.css';
import GoalList from './components/GoalList'
import NewGoalModal from './components/NewGoalModal'

function App() {
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [goalList, setGoalList] = useState(
    localStorage.getItem('goalList') ? JSON.parse(localStorage.getItem('goalList')) : []
  );
  const [formShown, setFormShown] = useState(false)

  useEffect(() => {
    localStorage.setItem('goalList', JSON.stringify(goalList))
  }, [goalList])

  function toggleNewGoalForm() {
    setFormShown(!formShown);
  }

  function handleNewGoalSubmit(event) {
    event.preventDefault();
    setGoalList([...goalList, {
      title: newGoalTitle,
      streak: 0, 
      done: false
    }]);
    localStorage.setItem('goalList', JSON.stringify(goalList))
    setFormShown(false);
  }

  function handleNewGoalTitle(event) {
    setNewGoalTitle(event.target.value);
  }

  function handleDone(event) {
    const id = event.target.dataset.index;
    let newGoalList = [...goalList];
    newGoalList[id].done = !goalList[id].done;
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
          handleChange={handleNewGoalTitle} 
          handleSubmit={handleNewGoalSubmit}></NewGoalModal>
      </header>
      <main>
        <GoalList items={goalList} handleDone={handleDone}></GoalList>
      </main>
    </div>
  );
}

export default App;
