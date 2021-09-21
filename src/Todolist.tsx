import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Button } from "./components/Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  filter: FilterValuesType;
  idTodolist: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  updateTasks: (title: string, id: string, todolistId: string) => void;
  updateTodoListTitle: (title: string, todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const addTaskHandler = (title: string) => {
    props.addTask(title, props.idTodolist);
  };
  const removeTodolist = () => props.removeTodolist(props.idTodolist);
  const onClickFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value, props.idTodolist);
  };
  const editSpanHandler = (title: string) => {
    props.updateTodoListTitle(title, props.idTodolist);
  };
  const removeTaskHandler = (taskId: string) => {props.removeTask(taskId, props.idTodolist)}
  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
    props.changeTaskStatus(taskId, e.currentTarget.checked, props.idTodolist);
  };
  const updateNameTasksHandler = (title: string, taskId: string) => {
    props.updateTasks(title, taskId, props.idTodolist);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editSpanHandler} />
        <Button nameBtn={"x"} callback={removeTodolist} />
      </h3>

      {/*//РАЗБИТИЕ------------------*/}
      {/* <Input title={titleInput} setTitle={setTitleInput} callBack={()=>addTaskHandler(titleInput)} error={error} setError={setError}/>
      <Button nameBtn={"ADD"} callback={()=>addTaskHandler(titleInput)}/>*/}
      <AddItemForm callBack={addTaskHandler} />
      {/*//--------------------------*/}

      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={(e) => onChangeTaskHandler(e, t.id)}
                checked={t.isDone}
              />
              <EditableSpan
                title={t.title}
                callBack={() => updateNameTasksHandler(t.title, t.id)}
              />
              <Button nameBtn={"x"} callback={() => removeTaskHandler(t.id)} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          className={props.filter === "all" ? "active-filter" : ""}
          nameBtn={"All"}
          callback={() => onClickFilterHandler("all")}
        />
        <Button
          className={props.filter === "active" ? "active-filter" : ""}
          nameBtn={"Active"}
          callback={() => onClickFilterHandler("active")}
        />
        <Button
          className={props.filter === "completed" ? "active-filter" : ""}
          nameBtn={"Completed"}
          callback={() => onClickFilterHandler("completed")}
        />
      </div>
    </div>
  );
}
