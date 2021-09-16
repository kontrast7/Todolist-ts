import React from 'react';

type propsType={
    callBack:()=>void
    className?:string
    valueBtn:string
}

export const Button=(props:propsType)=>{
    const onClickHandler=()=>{
        props.callBack()
    }
    return(
        <button onClick={onClickHandler} className={props.className}>{props.valueBtn}</button>
    )
}