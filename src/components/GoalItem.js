import React from 'react'

export default function GoalItem(props) {
  return(
    <article className={'GoalItem ' + (props.done ? 'done' : '')}>
      <header>
        <h2>{props.title}</h2>
        <div>
          <button 
            className="App-button" 
            data-index={props.index} 
            onClick={props.handleDone}>
              Done</button>
        </div>
      </header>
      <footer>
        <p class="streak">Streak: {props.streak} Day{props.streak !== 1 ? 's' : ''}</p>
        <div>
          <button data-index={props.index} onClick={props.handleRemove}>Remove</button>
        </div>
      </footer>
    </article>
  )
}