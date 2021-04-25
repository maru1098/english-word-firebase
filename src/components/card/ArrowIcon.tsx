import type { VFC } from "react";
import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";

type Props = {
  onClick?: () => void;
};

export const LeftArrow: VFC<Props> = (props) => {
  return (
    <button
      className="hidden sm:inline-block mr-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500 "
      onClick={props.onClick}
    >
      <ArrowNarrowLeftIcon className="w-8 h-8" />
    </button>
  );
};

export const RightArrow: VFC<Props> = (props) => {
  return (
    <button
      className="hidden sm:inline-block ml-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500"
      onClick={props.onClick}
    >
      <ArrowNarrowRightIcon className="w-8 h-8" />
    </button>
  );
};
