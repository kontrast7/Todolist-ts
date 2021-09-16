import styles from "./Input.module.css";
import React, { ChangeEvent, KeyboardEvent } from "react";

type propsType = {
  title: string;
  setTitle: (title: string) => void;
  callBack: () => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const Input = (props: propsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.setError(null);
    props.setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.callBack();
      props.setTitle("");
      props.setError(null);
    }
  };
  return (
    <>

      <input
        className={props.error === null ? styles.error : ""}
        value={props.title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
    </>
  );
};
