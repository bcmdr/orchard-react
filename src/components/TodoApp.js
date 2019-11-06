import React from "react";
import TodoList from "./TodoList";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      newItemText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addTodo(text) {
    const newItem = {
      text
    };
    this.setState(state => ({
      todoItems: [...state.todoItems, newItem],
      newItemText: ""
    }));
  }

  handleChange(event) {
    this.setState({
      newItemText: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addTodo(this.state.newItemText);
  }

  componentDidMount() {
    this.addTodo("Get Chicken");
    this.addTodo("Buy Beans");
    this.addTodo("Soften Tortillas");
  }

  render() {
    return (
      <div>
        <TodoList todoItems={this.state.todoItems}></TodoList>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.newItemText}></input>
          <input type="submit" value="Add Item" />
        </form>
      </div>
    );
  }
}

export default TodoApp;
