import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: false },
      { id: v1(), title: "HTML&CSS3", isDone: false },
      { id: v1(), title: "JS3", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "React Book", isDone: true },
      { id: v1(), title: "Milk2", isDone: false },
      { id: v1(), title: "React Book2", isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks });
  }
  
  const addTask = (title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todolistId],
      ],
    });
  }

  const addTodolist = (title: string) => {
    let newTodolistID = v1();
    setTodolists([
      { id: newTodolistID, title: title, filter: "all" },
      ...todolists,
    ]);
    setTasks({ ...tasks, [newTodolistID]: [] });
  };

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find((t) => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({ ...tasks });
    }
  }
  
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  
  const removeTodolist = (id: string) => {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodolists(todolists.filter((tl) => tl.id !== id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks });
  }

  const updateTasks = (title: string, id: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((m) =>
        m.id === id ? { ...m, title: title } : m
      ),
    });
  };

  const updateTodoListTitle = (title: string, todolistId: string) => {
    setTodolists([
      ...todolists.map((m) =>
        m.id === todolistId ? { ...m, title: title } : m
      ),
    ]);
  };

  return (
    <div className="App">
     <AddItemForm callBack={addTodolist} />
      {todolists.map((tl) => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;
        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            idTodolist={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            removeTodolist={removeTodolist}
            updateTasks={updateTasks}
            updateTodoListTitle={updateTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
