import React from 'react';
import {Button} from "@material-ui/core";

type propsType = {
	nameBtn:string;
	callback:()=> void;
	className?:string;
}
export const Buttons = (props:propsType) => {
	const onClickHandler = () => {
		props.callback()
	}
	return(
		<>
		<Button variant={"contained"} color={"primary"} onClick={onClickHandler}>{props.nameBtn}</Button>
		</>
	)
}