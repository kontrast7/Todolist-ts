import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, TextField } from "@material-ui/core";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState(false);

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError(true);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Title is required"
        aria-errormessage={"Title required!"}
        variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={error}
        size="small"
        className={error ? "error" : ""}
      />

      <Button
        variant="contained"
        style={{
          maxWidth: "37px",
          maxHeight: "70px",
          minWidth: "37px",
          minHeight: "37px",
        }}
        onClick={addItem}
      >
        +
      </Button>
    </div>
  );
}
