import type { NextPage } from "next";
import { CardLayout } from "src/components/card/CardLayout";
import { LeftArrow, RightArrow } from "src/components/card/ArrowIcon";
import SwipeableViews from "react-swipeable-views";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setWord } from "src/db/DbProvider";
import { AuthContext } from "src/auth/AuthProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";

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
    <Layout className="justify-between">
      <Title>単語カード</Title>
      <div className="w-screen grid grid-cols-7 sm:grid-cols-4">
        <SwipeableViews
          className="h-48 col-start-2 col-end-7 sm:col-end-4"
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
      </div>
      <div className="m-14">
        <LeftArrow onClick={() => previousWord()} />
        <RightArrow onClick={() => nextWord()} />
      </div>
    </Layout>
  );
};

export default Card;
