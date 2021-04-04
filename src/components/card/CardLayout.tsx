import { FlagIcon } from "src/components/card/FlagIcon";
import { ReverseIcon } from "src/components/card/ReverseIcon";
import { Word } from "src/components/card/Word";
import { SoundIcon } from "src/components/card/SoundIcon";
import { useState, useEffect, useContext } from "react";
import type { VFC } from "react";
import clsx from "clsx";
import { AuthContext } from "src/auth/AuthProvider";
import { setFlag } from "src/db/DbProvider";

type Props = {
  index: number;
  english: string;
  japanese: string;
  flag: boolean;
};

export const CardLayout: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [isFront, setIsFront] = useState(true);
  const [isFlag, setIsFlag] = useState(props.flag);
  const speakText = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };
  useEffect(() => {
    setIsFront(true);
  }, [props.index]);
  return (
    <div className="flex flex-col justify-between mt-10 w-80 h-48 mx-auto rounded border-b-2 border-r-2 border-gray-400 bg-gray-300 sm:mt-0">
      <div className="flex justify-between">
        <FlagIcon
          className="ml-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1 "
          isFlag={isFlag}
          onClick={() => {
            isFlag ? setIsFlag(false) : setIsFlag(true);
            // setFlag(currentUser.uid, folder, props.english, isFlag)
          }}
        />
        <ReverseIcon
          className="mr-2 mt-2 opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
          onClick={isFront ? () => setIsFront(false) : () => setIsFront(true)}
        />
      </div>
      <Word
        className={clsx("mx-auto", isFront ? "text-7xl" : "text-6xl mb-14")}
        word={isFront ? props.english : props.japanese}
      />
      {isFront && (
        <SoundIcon
          className="mb-2 mr-2 self-end opacity-60 sm:hover:bg-gray-100 rounded-full p-1"
          onClick={() => speakText(props.english)}
        />
      )}
    </div>
  );
};
