import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { Input } from "@material-ui/core";
import {Buttons} from "./Buttons";
import s from "./AddItemForm.module.css"

type propsType={
    callBack:(title:string)=>void
}

export const AddItemForm=({callBack}:propsType)=>{
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
           callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    
    return(
        <div className={s.wrapper}>
            <Input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
           {/* <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            <Buttons nameBtn={'+'} callback={addTask} variant="contained"/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}