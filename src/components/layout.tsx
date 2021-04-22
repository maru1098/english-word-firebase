import type { ReactNode } from "react";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className="ios-height flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-700 sm:min-h-screen">
      {props.children}
    </div>
  );
};
