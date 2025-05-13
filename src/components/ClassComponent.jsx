// import { useState } from "react";

// const FunctionalInput = ({ name }) => {
//   const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
//   const [inputVal, setInputVal] = useState("");

//   const handleInputChange = (e) => {
//     setInputVal(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTodos((todo) => [...todo, inputVal]);
//     setInputVal("");
//   };

//   return (
//     <section>
//       <h3>{name}</h3>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="task-entry">Enter a task: </label>
//         <input
//           type="text"
//           name="task-entry"
//           value={inputVal}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <h4>All the tasks!</h4>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo}>{todo}</li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default FunctionalInput;

import { Component } from "react";
import Count from "./Count";

class ClassInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({ ...state, inputVal: e.target.value }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({ todo: state.inputVal, isEditing: false }),
      inputVal: "",
    }));
  }

  handleDelete(index) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((todo, i) => i !== index),
    }));
  }

  handleEdit(index) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo, i) => {
        if (i == index) todo.isEditing = true;
        return todo;
      }),
    }));
  }

  handleResubmit(index) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo, i) => {
        if (i == index) todo.isEditing = false;
        return todo;
      }),
    }));
  }

  handleTodoEdit(e, index) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo, i) => {
        if (i == index) todo.todo = e.target.value;
        return todo;
      }),
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>
          All the tasks! <Count todos={this.state.todos}></Count>
        </h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => {
            return !todo.isEditing ? (
              <li key={index}>
                {todo.todo}
                <button onClick={() => this.handleDelete(index)}>X</button>
                <button onClick={() => this.handleEdit(index)}>Edit</button>
              </li>
            ) : (
              <li key={index}>
                <input
                  defaultValue={todo.todo}
                  onChange={(e) => this.handleTodoEdit(e, index)}
                ></input>
                <button onClick={() => this.handleDelete(index)}>X</button>
                <button onClick={() => this.handleResubmit(index)}>
                  Resubmit
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
