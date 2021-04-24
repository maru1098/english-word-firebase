import type { VFC } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
};

export const ReverseIcon: VFC<Props> = (props) => {
  return (
    <svg
      className={`w-10 h-10 ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={props.onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  );
};
