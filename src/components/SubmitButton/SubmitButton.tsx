import React from "react";
import { ISubmitButtonProps } from "./SubmitButton.types";

const SubmitButton = ({ text }: ISubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="h-10 rounded-md bg-blue-700 px-4 font-semibold text-white hover:bg-blue-800"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
