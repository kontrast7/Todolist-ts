import React, { ChangeEvent } from "react";
import { useState } from "react";

type propsType = {
  title: string;
  callBack: (title: string) =>void;
};

export const EditableSpan = (props: propsType) => {
  let [edit, setEdit] = useState(false);
  let [title, setTitle] = useState(props.title);
  const editOn = () => {
    setEdit(true);
  };
  const editOff = () => {
    setEdit(false);
    props.callBack(title)
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return edit ? (
    <input
      value={title}
      onBlur={editOff}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editOn}>{title}</span>
  );
};
