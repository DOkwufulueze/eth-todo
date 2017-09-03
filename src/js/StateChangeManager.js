import TodoStore from './TodoStore';

let stateChangeManager = null;

class StateChangeManager {
  constructor() {
    stateChangeManager = stateChangeManager ? stateChangeManager : this;
    stateChangeManager.state = this.getAppNewState();
  }

  getAppNewState() {
    return TodoStore.getState();
  }

  updateInputValue(value) {
    TodoStore.dispatch({
      type: 'Type todo',
      name: value,
    });

    return this.getAppNewState();
  }

  addTodo(value) {
    TodoStore.dispatch({
      type: 'Add todo',
      todo: {
        name: value,
        isEditing: false,
      },
    });

    return this.getAppNewState();
  }

  updateTodo(value) {
    TodoStore.dispatch({
      type: 'Update todo',
      name: value,
    });

    return this.getAppNewState();
  }

  editTodo(index) {
    TodoStore.dispatch({
      type: 'Edit todo',
      index: index,
    });

    return this.getAppNewState();
  }

  deleteTodo(index) {
    TodoStore.dispatch({
      type: 'Delete todo',
      index: index,
    });

    return this.getAppNewState();
  }
}

new StateChangeManager();
export default stateChangeManager;
