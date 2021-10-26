import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete">
          <Delete onClick={removeTodolist} />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ol>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id}>
              <span className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
              </span>
              <IconButton aria-label="delete">
                <Delete onClick={onClickHandler} />
              </IconButton>
            </li>
          );
        })}
      </ol>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          size="small"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          color="secondary"
          size="small"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          color="success"
          size="small"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
