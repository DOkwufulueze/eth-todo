import React, { Component } from 'react';
import '../css/App.css';
import TodoInputsSection from './TodoInputsSection';
import TodoEntry from './TodoEntry';
import stateChangeManager from './StateChangeManager';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      editing: null,
      inputValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTodoEditClick = this.handleTodoEditClick.bind(this);
    this.handleTodoDeleteClick = this.handleTodoDeleteClick.bind(this);
    this.handleTodoInputKeyUp = this.handleTodoInputKeyUp.bind(this);
    this.handleTodoInputSubmit = this.handleTodoInputSubmit.bind(this);
  }

  handleInputChange(evt) {
    let value = evt.target.value;
    this.setState(stateChangeManager.updateInputValue(value));
  }

  handleTodoEditClick(index) {
    const todoInput = document.getElementById('todo-input');
    this.setState(stateChangeManager.editTodo(index), () => todoInput.focus());
  }

  handleTodoDeleteClick(index) {
    const todoInput = document.getElementById('todo-input');
    this.setState(stateChangeManager.deleteTodo(index), () => todoInput.focus());
  }

  handleTodoInputKeyUp(evt) {

  }

  handleTodoInputSubmit() {
    const todoInput = document.getElementById('todo-input');
    let value = todoInput.value;
    if (value === '') {
      alert(':::Please suplly a Todo text.');
    } else {
      todoInput.value = '';
      this.setState(stateChangeManager.addTodo(value), () => todoInput.focus())
    }
  }

  render() {
    let todoList = this.state.todos.map((item, index) => {
      return (
        <TodoEntry
          for={ item.name }
          key={ index }
          onEditClick={ () => this.handleTodoEditClick(index) }
          onDeleteClick={ () => this.handleTodoDeleteClick(index) }
          background={ index % 2 === 0 ? '#bababa' : '#ffffff' }
          isEditing={ item.isEditing }
        />
      );
    });
    return (
      <div className="App">
        <div className="row">
          <TodoInputsSection
            onInputChange={ this.handleInputChange }
            onKeyUp={ this.handleTodoInputKeyUp }
            onClick={ this.handleTodoInputSubmit }
            editing={ this.state.editing }
            inputValue={ this.state.inputValue }
          />
        </div>

        <div className="row">
          {todoList}
        </div>
      </div>
    );
  }
}

export default App;
