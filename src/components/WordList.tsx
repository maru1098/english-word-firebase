import React, { useState, useEffect, VFC } from "react";
import { setWord, registWord, deleteWord } from "src/db/DbProvider";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import { AddDialog } from "src/components/AddDialog";
import { Button } from "src/components/Button";

type Props = {
  folder: string;
  uid: string;
};

export const WordList: VFC<Props> = (props) => {
  const [wordData, setWordData] = useState<{
    [key: string]: { [key: string]: string | boolean };
  }>({});
  const [open, setOpen] = useState(false);
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  useEffect(() => {
    const getWord = async () => {
      setWordData(await setWord(props.uid, props.folder));
    };
    getWord();
    setIsChange(false);
    return () => {
      setWordData({});
    };
  }, [isChange]);
  return (
    <ul className="w-screen grid grid-cols-4 sm:grid-cols-3 bg-gray-400">
      {Object.keys(wordData).map((val, i) => {
        return (
          <li
            key={i}
            className="my-1 col-start-2 col-end-4 border-4 text-center bg-gray-100 border-green-300 sm:col-start-2 sm:col-end-3"
          >
            <div className="flex justify-around items-center text-center">
              {val}
              <TrashIcon
                className="cursor-pointer h-5 w-5 border border-red-400 sm:hover:bg-red-200"
                color="red"
                onClick={async () => {
                  await deleteWord(props.uid, props.folder, val);
                  setIsChange(true);
                }}
              />
            </div>
          </li>
        );
      })}
      <PlusIcon
        className="w-7 h-7 col-start-2 col-end-4 my-2 mx-auto p-1 rounded-full border-2 border-yellow-300 bg-gray-200 sm:col-end-2 sm:hover:bg-yellow-200"
        onClick={() => setOpen(true)}
      />
      <AddDialog open={open} setOpen={setOpen} title="新しい単語を追加">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="english" className=" m-1 text-2xl">
            英語
          </label>
          <input
            id="english"
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
            className="mx-auto p-2 w-52 shadow border"
            type="text"
            placeholder="英単語の意味を入力"
            onChange={(e) => setJapanese(e.target.value)}
          />
          <Button
            onClick={async () => {
              await registWord(props.uid, props.folder, english, japanese);
              setIsChange(true);
              setOpen(false);
            }}
          >
            登録
          </Button>
        </div>
      </AddDialog>
    </ul>
  );
};
