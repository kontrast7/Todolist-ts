import React from "react";

type propsType = {
  callBack: () => void;
  className?: string;
  valueBtn: string;
};

export const Button = ({ callBack, className, valueBtn }: propsType) => {
  const onClickHandler = () => {
    callBack();
  };
  return (
    <button onClick={onClickHandler} className={className}>
      {valueBtn}
    </button>
  );
};
