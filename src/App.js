import React, { Component } from 'react';
import './App.css';
import TodoInputsSection from './TodoInputsSection';
import TodoEntry from './TodoEntry';

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
    this.handleTodoMouseOver = this.handleTodoMouseOver.bind(this);
    this.handleTodoMouseOut = this.handleTodoMouseOut.bind(this);
  }

  refreshAppState(todosCopy, editing = null, inputValue = '') {
    const todoInput = document.getElementById('todo-input');
    this.setState({
      todos: todosCopy,
      editing: editing,
      inputValue: inputValue,
    });

    todoInput.focus();
  }

  handleInputChange(evt) {
    let value = evt.target.value;
    this.setState({
      inputValue: value,
    });
  }

  handleTodoEditClick(index) {
    let todosCopy = this.state.todos.slice();
    todosCopy.forEach(item => item.isEditing = false);
    todosCopy[index].isEditing = true;
    this.refreshAppState(todosCopy, {
      index: index,
    }, todosCopy[index].name);
  }

  handleTodoDeleteClick(index) {
    let todosCopy = this.state.todos.slice();
    if (window.confirm(`Are you sure you want to delete TODO: "${todosCopy[index].name}"?`)) {
      todosCopy.splice(index, 1);
      this.refreshAppState(todosCopy);
    }
  }

  handleTodoInputKeyUp(evt) {

  }

  handleTodoInputSubmit(evt) {
    const todoInput = document.getElementById('todo-input');
    let value = todoInput.value;
    if (value === '') {
      alert(':::Please suplly a Todo text.');
    } else {
      let todosCopy = this.state.todos.slice();
      if (this.state.editing && (this.state.editing.index || this.state.editing.index >= 0)) {
        todosCopy[this.state.editing.index].name = value;
        todosCopy[this.state.editing.index].isEditing = false;
      } else {
        todosCopy.push({
          name: value,
          isEditing: false,
        });
      }
      
      todoInput.value = '';
      this.refreshAppState(todosCopy);
    }
    
    todoInput.focus();
  }

  handleTodoMouseOver(evt) {
    let target = evt.target;
    let actions = target.querySelector('div.todo-actions') || (target.nextSibling ? target.nextSibling.closest('div.todo-actions') : null);
    if (actions) actions.style.display = 'block';
  }

  handleTodoMouseOut(evt) {
    let target = evt.target;
    let actions = target.querySelector('div.todo-actions') || (target.nextSibling ? target.nextSibling.closest('div.todo-actions') : null);
    if (actions) actions.style.display = 'none';
  }

  render() {
    let todoList = this.state.todos.map((item, index) => {
      return (
        <TodoEntry
          for={ item.name }
          key={ index }
          onEditClick={ () => this.handleTodoEditClick(index) }
          onDeleteClick={ () => this.handleTodoDeleteClick(index) }
          onMouseOver={ this.handleTodoMouseOver }
          onMouseOut={ this.handleTodoMouseOut }
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
