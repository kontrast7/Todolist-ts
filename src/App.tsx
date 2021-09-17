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

  function removeTask(todolistID: string, id: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((f) => f.id !== id),
    });
  }

  function addTask(todolistID: string, title: string) {
    setTasks({
      ...tasks,
      [todolistID]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todolistID],
      ],
    });
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((f) =>
        f.id === taskId ? { ...f, isDone: isDone } : f
      ),
    });
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((m) => (m.id === todolistID ? { ...m, filter: value } : m))
    );
  }

  const removeTodoList = (todoListsId: string) => {
    setTodolists(todolists.filter((f) => f.id !== todoListsId));
    delete tasks[todoListsId];
  };

  return (
    <div className="App">
      {todolists.map((m) => {
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
            todolistID={m.id}
            removeTodoList={removeTodoList}
            title={m.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={m.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
