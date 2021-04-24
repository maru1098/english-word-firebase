import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className="my-10 w-32 h-10 rounded-full shadow font-bold text-lg italic bg-green-300 sm:hover:bg-green-400"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
