import React from 'react'

export default function NewGoalModal(props) {
  return (
    <section className={"NewGoalModal" + (props.shown ? '' : ' displayNone')}>
      <form autoComplete="off" onSubmit={props.handleSubmit}>
          <label htmlFor="title">Goal Title</label>
          <input id="title" placeholder="New Goal..." onChange={props.handleChange} value={props.title}></input>
          <button className="App-button" onClick={props.handleSubmit}>Add</button>
      </form>
    </section>
  )
}