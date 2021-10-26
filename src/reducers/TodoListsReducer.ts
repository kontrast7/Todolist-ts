import { FilterValuesType, TodolistType } from "../App";

export const TodoListsReducer = (state: Array<TodolistType>, action: allType) => {
  switch (action.type) {
    case "REMOVE_TODO_LIST": {
      return state.filter((f) => f.id !== action.id);
    }
    case "CHANGE_FILTER": {
      let todolist = state.find((tl) => tl.id === action.todolistId);
      if (todolist) {
        todolist.filter = action.value;
      }
      return [...state];
    }
    case "CHANGE_TODO_TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "ADD_TODOLIST": {
      let newTodolist: TodolistType = {
        id: action.toslistId,
        title: action.title,
        filter: "all",
      };
      return [newTodolist, ...state];
    }
    default:
      return state;
  }
};

export type allType =
  | removeTodolistACType
  | changeFilterACType
  | changeTodolistTitleACType
  | addTodolistACType;

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export type changeFilterACType = ReturnType<typeof changeFilterAC>;
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE_TODO_LIST",
    id,
  } as const;
};
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: "CHANGE_FILTER",
    value,
    todolistId,
  } as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE_TODO_TITLE",
    id,
    title,
  } as const;
};
export const addTodolistAC = (toslistId: string, title: string) => {
  return { type: "ADD_TODOLIST", toslistId, title } as const;
};
