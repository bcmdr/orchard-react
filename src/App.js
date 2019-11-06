import React, { useState, useEffect } from 'react';
import './App.css';

function GoalItem(props) {
  return(
    <article className={'GoalItem ' + (props.done ? 'done' : '')}>
      <header>
        <h2>{props.title}</h2>
        <div>
          <button 
            className="App-button" 
            data-index={props.index} 
            onClick={(event) => props.handleDone(event)}>
              Done</button>
        </div>
      </header>
      <footer>
        <p>Streak: {props.streak} Day{props.streak !== 1 ? 's' : ''}</p>
        <div>
          <button>Edit</button>
        </div>
      </footer>
    </article>
  )
}

function GoalList(props) {
  return (
    <div className="GoalList">
      {props.items.map((goalItem, index) => (
        <GoalItem 
          key={index}
          index={index} 
          title={goalItem.title}
          streak={goalItem.streak}
          done={goalItem.done}
          handleDone={props.handleDone}
        ></GoalItem>
      ))}
    </div>
  ) 
}

function NewGoalModal(props) {
  return (
    <section className={"NewGoalModal" + (props.shown ? '' : ' displayNone')}>
      <form onSubmit={props.handleSubmit}>
          <label htmlFor="title">Goal Title</label>
          <input id="title" placeholder="New Goal..."></input>
          <button className="App-button" onClick={props.handleSubmit}>Add</button>
      </form>
    </section>
  )
}

function App() {
  const [goalList, setGoalList] = useState([])
  const [formShown, setFormShown] = useState(false)

  useEffect(() => {
    setGoalList([
      {
        title: 'Do 10 Pushups',
        streak: 0,
        done: false
      },
      {
        title: 'Read for 30 Minutes',
        streak: 0,
        done: false
      },
      {
        title: 'Meditate for 20 Minutes',
        streak: 0,
        done: true
      }
    ])
  }, [setGoalList]);

  function toggleNewGoalForm() {
    setFormShown(!formShown);
  }

  function handleNewGoal(event) {
    event.preventDefault();
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
        <NewGoalModal shown={formShown} handleSubmit={handleNewGoal}></NewGoalModal>
      </header>
      <main>
        <GoalList items={goalList} handleDone={handleDone}></GoalList>
      </main>
    </div>
  );
}

export default App;
