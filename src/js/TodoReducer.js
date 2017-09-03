import constants from './constants';

const TodoReducer = (state = { todos: [], editing: null, inputValue: '' }, action) => {
  let todosCopy;
  let stateCopy = state;
  switch(action.type) {
    case constants.TYPE_TODO:
      return {
        todos: stateCopy.todos,
        editing: stateCopy.editing,
        inputValue: action.name,
      };

    case constants.ADD_TODO:
      todosCopy = stateCopy.todos.slice();
      todosCopy.push(action.todo);
      return {
        todos: todosCopy,
        editing: null,
        inputValue: '',
      };

    case constants.EDIT_TODO:
      todosCopy = stateCopy.todos.slice();
      todosCopy.forEach(item => item.isEditing = false);
      todosCopy[action.index].isEditing = true;
      return {
        todos: todosCopy,
        editing: { index: action.index },
        inputValue: todosCopy[action.index].name,
      };

    case constants.UPDATE_TODO:
      todosCopy = stateCopy.todos.slice();
      todosCopy[stateCopy.editing.index].name = action.name;
      todosCopy[stateCopy.editing.index].isEditing = false;
      return {
        todos: todosCopy,
        editing: null,
        inputValue: '',
      };

    case constants.DELETE_TODO:
      todosCopy = stateCopy.todos.slice();
      if (window.confirm(`Are you sure you want to delete TODO: "${todosCopy[action.index].name}"?`)) {
        todosCopy.splice(action.index, 1);
        const EDITING_INDEX = todosCopy.indexOf(todosCopy.find(todo => todo.isEditing));
        stateCopy.editing = EDITING_INDEX >= 0 ? { index: EDITING_INDEX } : null;
        return {
          todos: todosCopy,
          editing: stateCopy.editing,
          inputValue: stateCopy.inputValue,
        };
      } else return stateCopy;

    default:
      return stateCopy;
  }
};

export default TodoReducer;
