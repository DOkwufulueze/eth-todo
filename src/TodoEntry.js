import React from 'react';
import './todo-list-section.css';

function TodoEntry(props) {
  return (
    <div
      className='todo-entry'
      onMouseOver={ props.onMouseOver }
      onMouseOut={ props.onMouseOut }
      style={ {
        background: props.background,
      } }>
      <TodoName
        value={ props.for }
        onMouseOver={ props.onMouseOver }
        onMouseOut={ props.onMouseOut }
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
    <div className='todo-name'
      onMouseOver={ props.onMouseOver }
      onMouseOut={ props.onMouseOut }
    >{ props.value }</div>
  );
}

function TodoActions(props) {
  return (
    <div className='todo-actions todo-column'>
      <div className='edit-todo' onClick={ props.onEditClick } style={ { cursor: (props.onEditClick ? 'pointer' : 'auto') } }>Edit</div>
      <div className='delete-todo' onClick={ props.onDeleteClick } style={ { cursor: (props.onDeleteClick ? 'pointer' : 'auto') } }>Delete</div>
      <div></div>
    </div>
  );
}

export default TodoEntry;
