import React, { useRef, useState, useEffect, VFC } from "react";
import { setWord, registWord } from "src/db/DbProvider";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";

type Props = {
  folder: string;
  uid: string;
};

export const WordList: VFC<Props> = (props) => {
  const [wordData, setWordData] = useState<{
    [key: string]: { [key: string]: string | boolean };
  }>({});
  const englishRef: React.RefObject<HTMLInputElement> = useRef();
  const japaneseRef: React.RefObject<HTMLInputElement> = useRef();
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const handleRegist = async () => {
    await registWord(props.uid, props.folder, english, japanese);
    alert(`${english}が登録されました`);
    englishRef.current.value = "";
    japaneseRef.current.value = "";
  };

  useEffect(() => {
    const getWord = async () => {
      setWordData(await setWord(props.uid, props.folder));
    };
    getWord();
    return () => {
      setWordData({});
    };
  }, []);
  return (
    <ul className="w-screen grid grid-cols-4 sm:grid-cols-3 bg-gray-400">
      {Object.keys(wordData).map((val, i) => {
        return (
          <li
            key={i}
            className="my-1 col-start-2 col-end-4 border-4 text-center bg-gray-100 border-green-300 sm:hover:bg-green-200 sm:col-start-2 sm:col-end-3"
          >
            <div className="flex justify-around items-center text-center">
              {val}
              <TrashIcon className="h-5 w-5" />
            </div>
          </li>
        );
      })}
      <PlusIcon className="w-5 h-5 col-start-2 col-end-4 my-2 mx-auto p-1 rounded-full bg-gray-200 sm:col-end-2" />
      {/* <label htmlFor="english" className=" m-1 text-2xl">
        英語
      </label>
      <input
        id="english"
        ref={englishRef}
        className="p-2 w-52 shadow border"
        type="text"
        placeholder="英単語を入力"
        onChange={(e) => setEnglish(e.target.value)}
      />
      <label htmlFor="japanese" className="m-1 text-2xl">
        日本語
      </label>
      <input
        id="japanese"
        ref={japaneseRef}
        className="mx-auto p-2 w-52 shadow border"
        type="text"
        placeholder="英単語の意味を入力"
        onChange={(e) => setJapanese(e.target.value)}
      />
      <Button onClick={() => handleRegist()}>登録</Button> */}
    </ul>
  );
};
