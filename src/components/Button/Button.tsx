import React from "react";

import { IButtonProps } from "./Button.types";

const Button = ({ text, action }: IButtonProps) => {
  return (
    <div
      onClick={action}
      className="flex min-w-[100px] cursor-pointer items-center justify-center rounded border border-blue-700 p-1 font-semibold text-blue-700 hover:bg-blue-700 hover:text-white hover:underline"
    >
      {text}
    </div>
  );
};

export default Button;
