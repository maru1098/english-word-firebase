import React, { FC } from "react";

type Props = {
  className?: string;
};

export const Layout: FC<Props> = (props) => {
  return (
    <div
      className={`${props.className} ios-height flex flex-col items-center bg-gray-200 dark:bg-gray-700 sm:min-h-screen`}
    >
      {props.children}
    </div>
  );
};
