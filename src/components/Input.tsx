import styles from "./Input.module.css";
import React, { ChangeEvent, KeyboardEvent } from "react";

type propsType = {
  title: string;
  setTitle: (title: string) => void;
  callBack: () => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const Input = ({
  title,
  setTitle,
  callBack,
  error,
  setError,
}: propsType) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setError(null);
      callBack();
      setTitle("");
    }
  };
  return (
      <input
        className={error === null ? styles.error : ""}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
  );
};
