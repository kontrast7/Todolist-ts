import React from "react";
import {Button, IconButton} from "@material-ui/core";
import s from "./Buttons.module.css";
import {Delete} from "@material-ui/icons";

type propsType = {
  nameBtn?: string;
  callback: () => void;
  className?: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  icon: boolean;
  size: "small" | "medium" | "large";
};

export const Buttons = (props: propsType) => {
  const onClickHandler = () => {
    props.callback();
  };

  return  props.icon ? (
      <span className={s.btn}>
      <IconButton onClick={onClickHandler} size={props.size} aria-label="delete">
        <Delete />
      </IconButton>
    </span>
      ) :(
      <span className={s.btn}>
      <Button onClick={onClickHandler} size={props.size} variant={props.variant}>
        {props.nameBtn}
      </Button>
       </span>
      )

};


