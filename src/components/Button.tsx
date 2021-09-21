import React from 'react';

type propsType = {
	nameBtn:string;
	callback:()=> void;
	className?:string;
}
export const Button = (props:propsType) => {
	const onClickHandler = () => {
		props.callback()
	}
	return(<button className={props.className} onClick={onClickHandler}>{props.nameBtn}</button>)
}