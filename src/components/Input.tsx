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
		props.setTitle(e.currentTarget.value);
		props.setError(null);
	};
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			props.callBack();
			props.setTitle("");
			props.setError(null);
		}
	};
	return(
	<div>
	<input
				className={props.error === null ? styles.error : ""}
				value={props.title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
			/>
		
		{props.error && <div className="error-message">{props.error}</div>}
	</div>
)
};
