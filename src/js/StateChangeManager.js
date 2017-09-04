import TodoStore from './TodoStore';

let stateChangeManager = null;

class StateChangeManager {
  constructor() {
    stateChangeManager = stateChangeManager ? stateChangeManager : this;
    stateChangeManager.appState = stateChangeManager.getAppNewState();
    stateChangeManager.web3SuggesterState = stateChangeManager.getWeb3SuggesterNewState();
    return stateChangeManager;
  }

  getAppNewState() {
    return TodoStore.getState();
  }

  getWeb3SuggesterNewState() {
    return {};
  }

  updateInputValue(value) {
    TodoStore.dispatch({
      type: 'Type todo',
      name: value,
    });

    return stateChangeManager.getAppNewState();
  }

  addTodo(value) {
    TodoStore.dispatch({
      type: 'Add todo',
      todo: {
        name: value,
        isEditing: false,
      },
    });

    return stateChangeManager.getAppNewState();
  }

  updateTodo(value) {
    TodoStore.dispatch({
      type: 'Update todo',
      name: value,
    });

    return stateChangeManager.getAppNewState();
  }

  editTodo(index) {
    TodoStore.dispatch({
      type: 'Edit todo',
      index: index,
    });

    return stateChangeManager.getAppNewState();
  }

  deleteTodo(index) {
    TodoStore.dispatch({
      type: 'Delete todo',
      index: index,
    });

    return stateChangeManager.getAppNewState();
  }
}

stateChangeManager = new StateChangeManager();
export default stateChangeManager;
