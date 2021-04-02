import Link from "next/link";
import { db } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useState, useRef } from "react";

const Registration = () => {
  const { currentUser } = useContext(AuthContext);
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const englishRef: React.RefObject<HTMLInputElement> = useRef();
  const japaneseRef: React.RefObject<HTMLInputElement> = useRef();
  const createUser = async () => {
    try {
      await db
        .collection("user")
        .doc(currentUser.uid)
        .collection(folder)
        .doc(english)
        .set({
          japanese: japanese,
          isFlag: false,
        });
      alert(`${english}が登録されました`);
      englishRef.current.value = "";
      japaneseRef.current.value = "";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="ios-height flex flex-col justify-between sm:min-h-screen">
      <h1 className="mx-auto">単語登録ページ</h1>

      <div className="mx-auto">
        <label htmlFor="folder" className="">
          単語帳名:
        </label>
        <input
          id="folder"
          className="p-2 w-52 shadow border"
          type="text"
          placeholder="単語帳の名前を入力"
          onChange={(e) => setFolder(e.target.value)}
        />
      </div>
      <div className="mx-auto">
        <label htmlFor="english" className="">
          英語:
        </label>
        <input
          id="english"
          ref={englishRef}
          className="p-2 w-52 shadow border"
          type="text"
          placeholder="英単語を入力"
          onChange={(e) => setEnglish(e.target.value)}
        />
      </div>
      <div className="mx-auto">
        <label htmlFor="japanese" className="">
          日本語:
        </label>
        <input
          id="japanese"
          ref={japaneseRef}
          className="mx-auto p-2 w-52 shadow border"
          type="text"
          placeholder="英単語の意味を入力"
          onChange={(e) => setJapanese(e.target.value)}
        />
      </div>
      <button className="mx-auto w-32 bg-blue-300" onClick={() => createUser()}>
        登録
      </button>
      <Link href="/">
        <button className="mx-auto mb-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </div>
  );
};

export default Registration;
