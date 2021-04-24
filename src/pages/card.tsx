import type { NextPage } from "next";
import Link from "next/link";
import { CardLayout } from "src/components/card/CardLayout";
import { LeftArrow, RightArrow } from "src/components/card/ArrowIcon";
import SwipeableViews from "react-swipeable-views";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setWord } from "src/db/DbProvider";
import { AuthContext } from "src/auth/AuthProvider";
import { Layout } from "src/components/layout";

const Card: NextPage = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [index, setIndex] = useState<number>(0);
  const [wordData, setWordData] = useState<{
    [key: string]: { [key: string]: string | boolean };
  }>({});
  const wordsKey = Object.keys(wordData);
  const previousWord = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };
  const nextWord = () => {
    if (index < wordsKey.length - 1) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const getWord = async () => {
      if (currentUser) {
        setWordData(await setWord(currentUser.uid, router.query.folder));
      }
    };
    getWord();
  }, [currentUser]);

  return (
    <Layout>
      <h1 className="mt-5 px-20 py-3 border-4 border-green-500 text-3xl bg-green-300">
        単語カード
      </h1>
      <SwipeableViews
        index={index}
        onChangeIndex={(index: number) => setIndex(index)}
      >
        {wordsKey.map((english, i) => {
          return (
            <CardLayout
              key={i}
              index={index}
              english={english}
              japanese={wordData[wordsKey[i]].japanese as string}
              flag={wordData[wordsKey[i]].isFlag as boolean}
              folder={router.query.folder as string}
            />
          );
        })}
      </SwipeableViews>
      <div className="m-5 sm:m-10 ">
        <LeftArrow onClick={() => previousWord()} />
        <RightArrow onClick={() => nextWord()} />
      </div>

      <Link href="/">
        <button className="mb-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </Layout>
  );
};

export default Card;
