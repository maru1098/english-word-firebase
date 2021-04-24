import React, { FC } from "react";
import Link from "next/link";

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

export const BackButton = () => {
  return (
    <Link href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 m-2 self-center justify-self-center sm:hover:bg-gray-100 rounded-full p-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </Link>
  );
};
