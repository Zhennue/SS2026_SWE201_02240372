export const initialTaskState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { ...state, tasks: action.tasks };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };

    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task,
        ),
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, title: action.title } : task,
        ),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.done),
      };

    default:
      return state;
  }
}
