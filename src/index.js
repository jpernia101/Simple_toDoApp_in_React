import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let id = 0;

//this RETURNS AN OBJECT LITERAL ...
//NOTICE THE SYNTAX..HOW THE ARROW FUNCTION USES PARENTHEIS ()
//INSTEAD OF USING {}
const Todo = props => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toDO: [],
      count: 0
    };
  }

  addToDo(task) {
    const text = prompt("TODO TXT PLEASE !");
    this.setState({
      toDO: [...this.state.toDO, { id: id++, text: text, checked: false }]
    });
  }

  removeTodo(id) {
    this.setState({
      toDO: this.state.toDO.filter(todo => {
        return todo.id !== id;
      })
    });
  }

  toggleTodo(id) {
    this.setState({
      toDO: this.state.toDO.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
  render() {
    return (
      <div className="App">
        <div>Todo count: {this.state.toDO.length}</div>
        <div>
          Unchecked todo count:{" "}
          {this.state.toDO.filter(todo => !todo.checked).length}
        </div>
        <button
          onClick={() => {
            this.addToDo();
          }}
        >
          Add Task
        </button>
        <ul>
          {this.state.toDO.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
