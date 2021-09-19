import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { SpanInput } from "./components/SpanInput";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  addTask: (todolistID: string, title: string) => void;
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilterTodoList: (todolistID: string, value: FilterValuesType) => void;
  changeStatusTask: (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => void;
  removeTodoList: (todoListsId: string) => void;
  filter: FilterValuesType;
};

export function Todolist({
  todoListId,
  removeTodoList,
  tasks,
  removeTask,
  changeFilterTodoList,
  addTask,
  changeStatusTask,
  filter,
  ...props
}: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(todoListId, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const filterTodoList = (value: FilterValuesType) => {
    changeFilterTodoList(todoListId, value);
  };

  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  const removeTaskHandler = (id: string) => removeTask(todoListId, id);

  const changeStatusTaskHandler = (
    todolistID: string,
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeStatusTask(todolistID, id, e.currentTarget.checked);
  };

  return (
    <div>
      <h3>
        {props.title}
        <Button callBack={removeTodoListHandler} valueBtn={"x"} />
      </h3>

      <div>
        <Input
          title={title}
          setTitle={setTitle}
          callBack={addTaskHandler}
          error={error}
          setError={setError}
        />
        <Button callBack={addTaskHandler} valueBtn={"+"} />

        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={(e) => changeStatusTaskHandler(todoListId, t.id, e)}
                checked={t.isDone}
              />
              <SpanInput title={t.title} />
              <Button callBack={() => removeTaskHandler(t.id)} valueBtn={"x"} />
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          callBack={() => filterTodoList("all")}
          valueBtn={"All"}
          className={filter === "all" ? "active-filter" : ""}
        />
        <Button
          callBack={() => filterTodoList("active")}
          valueBtn={"Active"}
          className={filter === "active" ? "active-filter" : ""}
        />
        <Button
          callBack={() => filterTodoList("completed")}
          valueBtn={"Completed"}
          className={filter === "completed" ? "active-filter" : ""}
        />
      </div>
    </div>
  );
}
