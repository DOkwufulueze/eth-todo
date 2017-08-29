import React from 'react';
import './todo-entry.css';

function TodoEntry(props) {
  return (
    <div
      className='todo-entry'
      style={ {
        background: props.background,
      } }>
      <TodoName
        value={ props.for }
      />
      <TodoActions
        onEditClick={ props.isEditing ? null : props.onEditClick }
        onDeleteClick={ props.isEditing ? null : props.onDeleteClick }
      />
    </div>
  );
}

function TodoName(props) {
  return (
    <div className='todo-name todo-column'>{ props.value }</div>
  );
}

function TodoActions(props) {
  return (
    <div className='todo-actions todo-column'>
      <div
        className='edit-todo'
        onClick={ props.onEditClick }
        style={ { cursor: (props.onEditClick ? 'pointer' : 'auto') } }
      >Edit</div>
      <div
        className='delete-todo'
        onClick={ props.onDeleteClick }
        style={ { cursor: (props.onDeleteClick ? 'pointer' : 'auto') } }
      >Delete</div>
      <div></div>
    </div>
  );
}

export default TodoEntry;
