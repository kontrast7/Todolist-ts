import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {removeTaskAC, TaskReducer, addTaskAC, changeStatusAC, changeTaskTitleAC, addTodolistTasksAC, removeTaskOnDeletedTLAC,} from "./reducers/TaskReducer";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodoListsReducer,} from "./reducers/TodoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [tasks, dispatchTasks] = useReducer(TaskReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  });

  let [todolists, dispatchTodolists] = useReducer(TodoListsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  function removeTask(id: string, todolistId: string) {
    dispatchTasks(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatchTasks(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchTasks(changeStatusAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function removeTodolist(id: string) {
    dispatchTodolists(removeTodolistAC(id));
    dispatchTasks(removeTaskOnDeletedTLAC(id));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolists(changeFilterAC(value, todolistId));
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatchTodolists(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    const toslistId = v1();
    dispatchTodolists(addTodolistAC(toslistId, title));
    dispatchTasks(addTodolistTasksAC(toslistId));
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
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
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
