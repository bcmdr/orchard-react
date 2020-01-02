import React, { useCallback } from 'react';
import GoalItem from './GoalItem';
// import Dragula from 'react-dragula';

function GoalList(props, listRef) {
  // const listRef = useCallback(node => {
  //   let drake = Dragula([node]);
  //   drake.on('drop', (el, target) => {
  //     let currentGoalList = props.items;
  //     console.log(currentGoalList);
  //     let indices = []
  //     let newGoalList = [];
  //     for (let i = 0; i < node.children.length; i++) {
  //       let child = node.children[i];
  //       indices.push(Number(child.dataset.index));
  //     }
  //     for (let index of indices) {
  //       console.log(index);
  //       console.log(currentGoalList[index]);
  //       newGoalList.push(currentGoalList[index]);
  //     }
  //     localStorage.setItem("goalList", JSON.stringify(newGoalList));
  //     console.log(indices);
  //     console.log(newGoalList);
  //     console.log(currentGoalList);
  //   });
  // }, [props]);
  return (
    <div className="GoalList" ref={listRef}>
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