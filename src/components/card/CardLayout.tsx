import { Word } from "src/components/card/Word";
import { useRef, useState, useEffect, useContext } from "react";
import type { VFC } from "react";
import clsx from "clsx";
import { AuthContext } from "src/auth/AuthProvider";
import { setFlag } from "src/db/DbProvider";
import {
  VolumeUpIcon,
  FlagIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";

type Props = {
  index: number;
  english: string;
  japanese: string;
  flag: boolean;
  folder: string;
};

export const CardLayout: VFC<Props> = (props) => {
  const isFirstRender = useRef(false);
  const { currentUser } = useContext(AuthContext);
  const [isFront, setIsFront] = useState(true);
  const [isFlag, setIsFlag] = useState(props.flag);
  const speakText = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };
  useEffect(() => {
    isFirstRender.current = true;
  }, []);
  useEffect(() => {
    setIsFront(true);
  }, [props.index]);
  useEffect(() => {
    isFirstRender.current
      ? (isFirstRender.current = false)
      : setFlag(currentUser.uid, props.folder, props.english, isFlag);
  }, [isFlag]);
  return (
    <div className="flex flex-col justify-between rounded border-b-2 border-r-2 border-gray-400 bg-gray-300 ">
      <div className="flex justify-between">
        <FlagIcon
          className="cursor-pointer w-10 h-10 ml-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
          fill={isFlag ? "yellow" : "none"}
          onClick={() => {
            isFlag ? setIsFlag(false) : setIsFlag(true);
          }}
        />
        <SwitchHorizontalIcon
          className="cursor-pointer w-10 h-10 mr-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
          onClick={isFront ? () => setIsFront(false) : () => setIsFront(true)}
        />
      </div>
      <Word
        className={clsx(
          "mx-auto p-3 break-all",
          isFront ? "text-6xl " : "text-5xl mb-11 mt-2"
        )}
        word={isFront ? props.english : props.japanese}
      />
      {isFront && (
        <VolumeUpIcon
          className="cursor-pointer w-10 h-10 mr-2 mb-2 self-end opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
          onClick={() => speakText(props.english)}
        />
      )}
    </div>
  );
};
