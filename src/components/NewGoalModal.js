import React, { useEffect, useRef } from 'react'

export default function NewGoalModal(props) {
  const titleInput = useRef()
  useEffect(()=>{
    titleInput.current.focus();
  })
  return (
    <section className={"justify-center NewGoalModal" + (props.shown ? '' : ' displayNone')}>
      <form className="width-wrapper" autoComplete="off" onSubmit={props.handleSubmit}>
          <label htmlFor="title">Goal Title</label>
          <input 
            ref={titleInput}
            id="title" placeholder="New Goal..." 
            onChange={props.handleChange} 
            value={props.title}>
          </input>
          <button className="App-button" onClick={props.handleSubmit}>Add</button>
      </form>
    </section>
  )
}