import type { NextPage } from "next";
import Link from "next/link";
import { FlagIcon } from "src/components/card/FlagIcon";
import { ReverseIcon } from "src/components/card/ReverseIcon";
import { SoundIcon } from "src/components/card/SoundIcon";
import { Word } from "src/components/card/Word";
import { LeftArrow, RightArrow } from "src/components/card/ArrowIcon";
import SwipeableViews from "react-swipeable-views";
import React, { useState, useEffect } from "react";
import { wordSet } from "src/db/DbProvider";

const Card: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
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
  const speakText = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };

  useEffect(() => {
    setIsFront(true);
  }, [index]);

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
          return isFront ? (
            <div
              key={i}
              className="flex flex-col justify-between mt-10 w-80 h-48 mx-auto rounded border-b-2 border-r-2 border-gray-400 bg-gray-300 sm:mt-0"
            >
              <div className="flex justify-between">
                <FlagIcon className="ml-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1" />
                <ReverseIcon
                  className="mr-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
                  onClick={() => setIsFront(false)}
                />
              </div>
              <Word className="mx-auto text-7xl" word={word} />
              <SoundIcon
                className="mb-2 mr-2 self-end opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
                onClick={() => speakText(word)}
              />
            </div>
          ) : (
            <div
              key={i}
              className="flex flex-col justify-between mt-10 w-80 h-48 mx-auto rounded border-b-2 border-r-2 border-gray-400 bg-gray-300 sm:mt-0"
            >
              <div className="flex justify-between">
                <FlagIcon className="ml-2 mt-2 opacity-60 sm:hover:gb-gray-100 rounded-full p-1" />
                <ReverseIcon
                  className="mr-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
                  onClick={() => setIsFront(true)}
                />
              </div>
              <Word
                className="mx-auto text-6xl mb-14"
                word={wordSet[english[i]].japanese}
              />
            </div>
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
