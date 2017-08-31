import React from 'react';
import '../css/todo-inputs-section.css'

function TodoInputsSection(props) {
  return (
    <div className='todo-inputs-section'>
      <TodoInput
        onKeyUp={ props.onKeyUp }
        editing={ props.editing }
        inputValue={ props.inputValue }
        onInputChange={ props.onInputChange }
      />

      <SubmitButton
        onClick={ props.onClick }
        editing={ props.editing }
      />
    </div>
  );
}

function TodoInput(props) {
  return (
    <input
      className='todo-input'
      id='todo-input'
      value={ props.inputValue }
      onKeyUp={ props.onKeyUp }
      onChange={ props.onInputChange }
    />
  );
}

function SubmitButton(props) {
  return (
    <input type='button' className='submit-button' value={ props.editing ? 'Update' : 'Add'} onClick={ props.onClick } />
  );
}

export default TodoInputsSection;
