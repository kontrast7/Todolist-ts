import React from 'react';
import { Button } from "@material-ui/core";
import s from "./Buttons.module.css"

type propsType = {
	nameBtn:string;
	callback:()=> void;
	className?:string;
	variant?: "text" | "outlined" | "contained" | undefined;
}
export const Buttons = (props:propsType) => {
	const onClickHandler = () => {
		props.callback()
	}
	return(
		<span className={s.btn}>
		<Button onClick={onClickHandler} variant={props.variant}>{props.nameBtn}</Button>
		</span>
			)
}