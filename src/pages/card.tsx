import type { NextPage } from "next";
import Link from "next/link";
import { CardLayout } from "src/components/card/CardLayout";
import { LeftArrow, RightArrow } from "src/components/card/ArrowIcon";
import SwipeableViews from "react-swipeable-views";
import React, { useState, useEffect } from "react";
import { wordSet } from "src/db/DbProvider";

const Card: NextPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [getWord, setGetWord] = useState({});
  const english = Object.keys(getWord);
  const previousWord = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };
  const nextWord = () => {
    if (index < english.length - 1) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    setGetWord(wordSet);
  }, []);
  return (
    <div className="ios-height flex flex-col justify-between bg-gray-100 sm:min-h-screen">
      <h1 className="mx-auto mt-10 px-20 py-3 border-4 border-green-500 text-3xl bg-green-300">
        単語カード
      </h1>
      <SwipeableViews
        index={index}
        onChangeIndex={(index: number) => setIndex(index)}
      >
        {english.map((word, i) => {
          return (
            <CardLayout
              key={i}
              index={index}
              getWord={getWord}
              english={word}
              japanese={wordSet[english[i]].japanese}
            />
          );
        })}
      </SwipeableViews>
      <div className="mx-auto flex">
        <LeftArrow onClick={() => previousWord()} />
        <RightArrow onClick={() => nextWord()} />
      </div>

      <Link href="/">
        <button className="mx-auto mb-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </div>
  );
};

export default Card;
