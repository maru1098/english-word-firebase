import type { VFC } from "react";

type Props = {
  onClick?: () => void;
};

export const LeftArrow: VFC<Props> = (props) => {
  return (
    <button
      className="mr-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500"
      onClick={props.onClick}
    >
      <svg
        width={30}
        height={30}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
    </button>
  );
};

export const RightArrow: VFC<Props> = (props) => {
  return (
    <button
      className="ml-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500"
      onClick={props.onClick}
    >
      <svg
        width={30}
        height={30}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );
};
