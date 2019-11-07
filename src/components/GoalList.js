import React from 'react'
import GoalItem from './GoalItem'

export default function GoalList(props) {
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
          handleRemove={props.handleRemove}
        ></GoalItem>
      ))}
    </div>
  ) 
}