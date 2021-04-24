import React, { FC } from "react";
import { BackButton } from "src/components/Button";

export const Title: FC = (props) => {
  return (
    <div className="grid grid-cols-4 w-screen">
      {props.children === "メニュー" ? "" : <BackButton />}
      <h1 className="my-10 py-3 text-center border-4 col-start-2 col-end-4 border-green-300 text-3xl bg-green-200">
        {props.children}
      </h1>
    </div>
  );
};
