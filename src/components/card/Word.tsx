import type { VFC } from "react";

type Props = {
  className?: string;
  word?: string;
};

export const Word: VFC<Props> = (props) => {
  return <p className={props.className}>{props.word}</p>;
};
