let stateChangeManager = null;

class StateChangeManager {
  constructor() {
    stateChangeManager = stateChangeManager ? stateChangeManager : this;
  }

  getAppNewState(todosCopy, editing = null, inputValue = '') {
    const newState = {
      todos: todosCopy,
      editing: editing,
      inputValue: inputValue,
    };

    return newState;
  }

  addTodo(value) {
    return (state, props) => {
      let todosCopy = state.todos.slice();
      if (state.editing && (state.editing.index || state.editing.index >= 0)) {
        todosCopy[state.editing.index].name = value;
        todosCopy[state.editing.index].isEditing = false;
      } else {
        todosCopy.push({
          name: value,
          isEditing: false,
        });
      }

      return this.getAppNewState(todosCopy);
    }
  }

  updateInputValue(value) {
    return {
      inputValue: value,
    };
  }

  editTodo(index) {
    return (state, props) => {
      let todosCopy = state.todos.slice();
      todosCopy.forEach(item => item.isEditing = false);
      todosCopy[index].isEditing = true;
      return this.getAppNewState(todosCopy, {
        index: index,
      }, todosCopy[index].name);
    };
  }

  deleteTodo(index) {
    return (state, props) => {
      let todosCopy = state.todos.slice();
      if (window.confirm(`Are you sure you want to delete TODO: "${todosCopy[index].name}"?`)) {
        todosCopy.splice(index, 1);
        return this.getAppNewState(todosCopy);
      }
    };
  }
}

new StateChangeManager();
export default stateChangeManager;
