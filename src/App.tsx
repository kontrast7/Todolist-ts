import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksType = { [key: string]: Array<TaskType> };

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  const removeTask = (todolistID: string, id: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((f) => f.id !== id),
    });
  };

  const addTask = (todolistID: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistID]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todolistID],
      ],
    });
  };

  const changeStatusTask = (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((f) =>
        f.id === taskId ? { ...f, isDone: isDone } : f
      ),
    });
  };

  const changeFilterTodoList = (
    todolistID: string,
    value: FilterValuesType
  ) => {
    setTodolists(
      todolists.map((m) => (m.id === todolistID ? { ...m, filter: value } : m))
    );
  };

  const removeTodoList = (todoListsId: string) => {
    setTodolists(todolists.filter((f) => f.id !== todoListsId));
    delete tasks[todoListsId];
  };

  const renderTodoList = todolists.map((m) => {
    let tasksForTodolist = tasks[m.id];

    if (m.filter === "active") {
      tasksForTodolist = tasks[m.id].filter((t) => !t.isDone);
    }
    if (m.filter === "completed") {
      tasksForTodolist = tasks[m.id].filter((t) => t.isDone);
    }

    return (
      <Todolist
        key={m.id}
        todoListId={m.id}
        removeTodoList={removeTodoList}
        title={m.title}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilterTodoList={changeFilterTodoList}
        addTask={addTask}
        changeStatusTask={changeStatusTask}
        filter={m.filter}
      />
    );
  });

  return (
    <div className="App">
      <input />
      <button>+</button>
      {renderTodoList}
    </div>
  );
}

export default App;
