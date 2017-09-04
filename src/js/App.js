import React, { Component } from 'react';
// import web3Manager from './Web3Manager';
import '../css/App.css';
import TodoInputsSection from './TodoInputsSection';
import TodoEntry from './TodoEntry';
import stateChangeManager from './StateChangeManager';

class App extends Component {
  constructor() {
    super();
    this.state = stateChangeManager.appState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTodoEditClick = this.handleTodoEditClick.bind(this);
    this.handleTodoDeleteClick = this.handleTodoDeleteClick.bind(this);
    this.handleTodoInputKeyUp = this.handleTodoInputKeyUp.bind(this);
    this.getAppropriateInputSubmitHandler = this.getAppropriateInputSubmitHandler.bind(this);
    this.handleTodoInsertion = this.handleTodoInsertion.bind(this);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    this.focusTodoInput = this.focusTodoInput.bind(this);
    this.refreshTodoInput = this.refreshTodoInput.bind(this);
  }

  handleInputChange(evt) {
    let value = evt.target.value;
    this.setState(stateChangeManager.updateInputValue(value));
  }

  handleTodoEditClick(index) {
    this.setState(stateChangeManager.editTodo(index), this.focusTodoInput);
  }

  handleTodoDeleteClick(index) {
    this.setState(stateChangeManager.deleteTodo(index), this.focusTodoInput);
  }

  handleTodoInputKeyUp(evt) {

  }

  handleTodoInsertion() {
    const TODO_INPUT = document.getElementById('todo-input');
    let value = TODO_INPUT.value;
    if (value === '') {
      alert(':::Please suplly a Todo text.');
    } else {
      this.setState(stateChangeManager.addTodo(value), this.refreshTodoInput);
    }
  }

  handleTodoUpdate() {
    const TODO_INPUT = document.getElementById('todo-input');
    let value = TODO_INPUT.value;
    if (value === '') {
      alert(':::Please suplly a Todo text.');
    } else {
      this.setState(stateChangeManager.updateTodo(value), this.refreshTodoInput);
    }
  }

  getAppropriateInputSubmitHandler() {
    this.state.editing && (this.state.editing.index || this.state.editing.index >= 0)
    ? this.handleTodoUpdate()
    : this.handleTodoInsertion();
  }

  refreshTodoInput() {
    const TODO_INPUT = document.getElementById('todo-input');
    TODO_INPUT.value = '';
    TODO_INPUT.focus();
  }

  focusTodoInput() {
    const TODO_INPUT = document.getElementById('todo-input');
    TODO_INPUT.focus();
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
        <div className='eth-info'>
          <div className='eth-network'>
            <div className='key'>Eth Network:</div><div className='value'>{ this.props.network }</div>
          </div>
          <div className='eth-address'>
            <div className='key'>Eth Address:</div><div className='value'>{ this.props.address }</div>
          </div>
        </div>
        <div className="row">
          <TodoInputsSection
            onInputChange={ this.handleInputChange }
            onKeyUp={ this.handleTodoInputKeyUp }
            onClick={ this.getAppropriateInputSubmitHandler }
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
