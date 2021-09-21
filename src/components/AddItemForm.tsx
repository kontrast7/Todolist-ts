import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

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
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button nameBtn={"+"} callback={addTask}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}