import type { ReactNode } from "react";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-200 dark:bg-gray-700">
        {props.children}
      </main>
    </div>
  );
};
