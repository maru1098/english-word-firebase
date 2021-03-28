import type { NextPage } from "next";
import Link from "next/link";
import { FlagIcon } from "src/components/card/FlagIcon";
import { ReverseIcon } from "src/components/card/ReverseIcon";
import { SoundIcon } from "src/components/card/SoundIcon";

const Card: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <h1 className="mx-auto my-10 px-20 py-3 border-4 border-green-500 text-3xl bg-green-300">
        単語カード
      </h1>
      <div className="flex flex-col justify-between w-80 h-48 mx-auto rounded shadow bg-gray-300">
        <div className="flex justify-between">
          <FlagIcon className="m-2 opacity-60" />
          <ReverseIcon className="m-2 opacity-60" />
        </div>
        <p className="mx-auto text-7xl">word</p>
        <SoundIcon className="m-2 self-end opacity-60" />
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
