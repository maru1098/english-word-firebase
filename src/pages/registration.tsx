import Link from "next/link";
import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useState, useRef } from "react";
import { registWord, getList } from "src/db/DbProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";
import { Button } from "src/components/Button";

const Registration = () => {
  const { currentUser } = useContext(AuthContext);
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [currentData, setCurrentData] = useState<string[]>([]);
  const englishRef: React.RefObject<HTMLInputElement> = useRef();
  const japaneseRef: React.RefObject<HTMLInputElement> = useRef();

  const createUser = async () => {
    await registWord(currentUser.uid, folder, english, japanese);
    alert(`${english}が登録されました`);
    englishRef.current.value = "";
    japaneseRef.current.value = "";
  };

  return (
    <Layout>
      <Title>単語登録</Title>
      <label htmlFor="folder" className="m-1 text-2xl">
        単語帳名
      </label>
      <input
        id="folder"
        className="p-2 w-52 shadow border"
        type="text"
        placeholder="単語帳の名前を入力"
        onChange={(e) => setFolder(e.target.value)}
      />
      <label htmlFor="english" className=" m-1 text-2xl">
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
      <Button onClick={() => createUser()}>登録</Button>
      <button
        className="mx-auto w-32 bg-blue-300"
        onClick={async () => {
          setCurrentData(await getList(currentUser.uid));
        }}
      >
        単語帳一覧
      </button>
      <ul>
        {currentData.map((val, i) => {
          return <li key={i}>{val}</li>;
        })}
      </ul>
    </Layout>
  );
};

export default Registration;
