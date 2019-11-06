import React from 'react'
import TodoItem from './TodoItem'

function TodoList (props) {
    return (
        <ul>
            {props.todoItems.map((item, index) => (
                <TodoItem key={index} text={item.text}></TodoItem>
            ))}
        </ul>
    );
}

export default TodoList