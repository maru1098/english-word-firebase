import React, { useState } from "react";
import type { VFC } from "react";

type Props = {
  className?: string;
  isFlag: boolean;
  onClick: () => void;
};

export const FlagIcon: VFC<Props> = (props) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      fill={props.isFlag ? "yellow" : "none"}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={props.onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
};
