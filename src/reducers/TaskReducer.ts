import { v1 } from "uuid";
import { TasksStateType } from "../App";

export const TaskReducer = (state: TasksStateType, action: allType) => {
  switch (action.type) {
    case "ADD_TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE_TASK": {
      //достанем нужный массив по todolistId:
      let todolistTasks = state[action.todolistId];
      // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
      state[action.todolistId] = todolistTasks.filter(
        (t) => t.id !== action.id
      );
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      return { ...state };
    }
    case "ADD_TASK": {
      let task = { id: v1(), title: action.title, isDone: false };
      //достанем нужный массив по todolistId:
      let todolistTasks = state[action.todolistId];
      // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
      state[action.todolistId] = [task, ...todolistTasks];
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      return { ...state };
    }
    case "CHANGE_STATUS": {
      //достанем нужный массив по todolistId:
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let task = todolistTasks.find((t) => t.id === action.id);
      //изменим таску, если она нашлась
      if (task) {
        task.isDone = action.isDone;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      }
      return { ...state };
    }
    case "CHANGE_TASK_TITLE": {
      //достанем нужный массив по todolistId:
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let task = todolistTasks.find((t) => t.id === action.id);
      //изменим таску, если она нашлась
      if (task) {
        task.title = action.newTitle;
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      }
      return { ...state };
    }
    case "REMOVE_TASK_ON_DELETED_TD": {
      delete state[action.id];
      return state;
    }
    default:
      return state;
  }
};

export type allType =
  | removeTaskACType
  | addTaskACType
  | changeStatusACType
  | changeTaskTitleACType
  | addTodolistTasksType
  | removeTaskOnDeletedTLACType;

export type removeTaskACType = ReturnType<typeof removeTaskAC>;
export type addTaskACType = ReturnType<typeof addTaskAC>;
export type changeStatusACType = ReturnType<typeof changeStatusAC>;
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export type addTodolistTasksType = ReturnType<typeof addTodolistTasksAC>;
export type removeTaskOnDeletedTLACType = ReturnType<
  typeof removeTaskOnDeletedTLAC
>;
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: "REMOVE_TASK",
    id,
    todolistId,
  } as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD_TASK",
    title,
    todolistId,
  } as const;
};
export const changeStatusAC = (
  id: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE_STATUS",
    id,
    isDone,
    todolistId,
  } as const;
};
export const changeTaskTitleAC = (
  id: string,
  newTitle: string,
  todolistId: string
) => {
  return {
    type: "CHANGE_TASK_TITLE",
    id,
    newTitle,
    todolistId,
  } as const;
};
export const addTodolistTasksAC = (todolistId: string) => {
  return {
    type: "ADD_TODOLIST",
    todolistId,
  } as const;
};
export const removeTaskOnDeletedTLAC = (id: string) => {
  return {
    type: "REMOVE_TASK_ON_DELETED_TD",
    id,
  } as const;
};
