import type { NextPage } from "next";
import Link from "next/link";
import { FlagIcon } from "src/components/card/FlagIcon";
import { ReverseIcon } from "src/components/card/ReverseIcon";
import { SoundIcon } from "src/components/card/SoundIcon";
import { Word } from "src/components/card/word";
import SwipeableViews from "react-swipeable-views";
import React, { useState } from "react";

const words = ["word", "test", "apple"];

const Card: NextPage = () => {
  const [index, setIndex] = useState(0);
  const previousWord = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };
  const nextWord = () => {
    if (index < words.length - 1) {
      setIndex(index + 1);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <h1 className="mx-auto my-10 px-20 py-3 border-4 border-green-500 text-3xl bg-green-300">
        単語カード
      </h1>
      <SwipeableViews index={index} onChangeIndex={(index) => setIndex(index)}>
        {words.map((word) => {
          return (
            <div
              key={word}
              className="flex flex-col justify-between w-80 h-48 mx-auto rounded border-b-2 border-r-2 border-gray-400 bg-gray-300"
            >
              <div className="flex justify-between">
                <FlagIcon className="m-2 opacity-60" />
                <ReverseIcon className="m-2 opacity-60" />
              </div>
              <Word className="mx-auto text-7xl" word={word} />
              <SoundIcon className="m-2 self-end opacity-60" />
            </div>
          );
        })}
      </SwipeableViews>
      <div className="mx-auto flex">
        <button
          className="mx-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500"
          onClick={previousWord}
        >
          <svg
            width={30}
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
        <button
          className="mx-10 px-10 rounded-full shadow bg-gray-400 hover:bg-gray-500"
          onClick={nextWord}
        >
          <svg
            width={30}
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
      </div>

      <Link href="/">
        <button className="mx-auto my-20 w-32 h-10 rounded-full shadow bg-green-300 hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </div>
  );
};

export default Card;
