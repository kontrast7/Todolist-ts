import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

export type TaskType = {
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
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => void;
  filter: FilterValuesType;
};

export function Todolist({
  todolistID,
  removeTodoList,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  ...props
}: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const callBackForAddTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(todolistID, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onClickFilterHandler = (value: FilterValuesType) =>
    changeFilter(todolistID, value);

  const callBackForTodolistRemoveHandler = () => {
    removeTodoList(todolistID);
  };

  const onClickHandler = (id: string) => removeTask(todolistID, id);

  const onChangeHandler = (
    todolistID: string,
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeTaskStatus(todolistID, id, e.currentTarget.checked);
  };

  return (
    <div>
      <h3>
        {props.title}
        <Button callBack={callBackForTodolistRemoveHandler} valueBtn={"x"} />
      </h3>

      <div>
        <Input
          title={title}
          setTitle={setTitle}
          callBack={callBackForAddTaskHandler}
          error={error}
          setError={setError}
        />

        <Button callBack={callBackForAddTaskHandler} valueBtn={"+"} />

        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={(e) => onChangeHandler(todolistID, t.id, e)}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <Button callBack={() => onClickHandler(t.id)} valueBtn={"x"} />
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          callBack={() => onClickFilterHandler("all")}
          valueBtn={"All"}
          className={filter === "all" ? "active-filter" : ""}
        />
        <Button
          callBack={() => onClickFilterHandler("active")}
          valueBtn={"Active"}
          className={filter === "active" ? "active-filter" : ""}
        />
        <Button
          callBack={() => onClickFilterHandler("completed")}
          valueBtn={"Completed"}
          className={filter === "completed" ? "active-filter" : ""}
        />
      </div>
    </div>
  );
}
