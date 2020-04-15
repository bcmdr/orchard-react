import React from 'react';
import GoalItem from './GoalItem';

function GoalList(props, listRef) {
  return (
    <div className="GoalList width-wrapper justify-center" ref={listRef}>
      {props.items.map((goalItem, index) => ( goalItem &&
        <GoalItem 
          key={index}
          index={index}
          color={goalItem.color}
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

export default React.forwardRef(GoalList);