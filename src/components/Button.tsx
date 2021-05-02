import React, { FC } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/outline";

type Props = {
  onClick: () => void;
  className?: string;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className={`${props.className} my-5 w-32 h-10 rounded-full shadow font-bold text-lg italic bg-green-300 sm:hover:bg-green-400`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const BackButton = () => {
  return (
    <Link href="/">
      <a className="self-center justify-self-center">
        <ChevronLeftIcon className="h-12 w-12 m-2 sm:hover:bg-gray-100 rounded-full p-1" />
      </a>
    </Link>
  );
};
