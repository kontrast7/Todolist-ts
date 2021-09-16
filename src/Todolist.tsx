import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistID: string;
  title: string;
  removeTodoList: (todoListsId: string) => void;
  tasks: Array<TaskType>;
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(props.todolistID, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const callBackHandlerForAddTask = () => {
    props.addTask(props.todolistID, title);
    setTitle("");
  };

  const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

  const callBackHandlerForTodolistRemove = () => {props.removeTodoList(props.todolistID);};

  return (
    <div>
      <h3>
        {props.title}
        <Button callBack={callBackHandlerForTodolistRemove} valueBtn={"x"} />
      </h3>

      <div>
        <Input
          title={title}
          setTitle={setTitle}
          callBack={callBackHandlerForAddTask}
          error={error}
          setError={setError}
        />
        <Button callBack={addTask} valueBtn={"+"} />

        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(props.todolistID, t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              props.todolistID,
              t.id,
              e.currentTarget.checked
            );
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <Button callBack={onClickHandler} valueBtn={"x"} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          callBack={onAllClickHandler}
          valueBtn={"All"}
          className={props.filter === "all" ? "active-filter" : ""}
        />
        <Button
          callBack={onActiveClickHandler}
          valueBtn={"Active"}
          className={props.filter === "active" ? "active-filter" : ""}
        />
        <Button
          callBack={onCompletedClickHandler}
          valueBtn={"Completed"}
          className={props.filter === "completed" ? "active-filter" : ""}
        />
      </div>
    </div>
  );
}
