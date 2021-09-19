import React, { ChangeEvent, useState } from "react";

type PropsType = {
  title: string;
};

export const SpanInput = (props: PropsType) => {

  return <span>{props.title}</span>
};
