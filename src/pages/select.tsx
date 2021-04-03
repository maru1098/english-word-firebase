import Link from "next/link";
import { db } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";

const Select = () => {
  const { currentUser } = useContext(AuthContext);
  const [folder, setFolder] = useState<string[]>([]);
  const folderRef = db.collection("user").doc(currentUser.uid);

  const setWord = async (val: string) => {
    const wordList = await folderRef.collection(val).get();
    const dataSet = {};
    wordList.forEach((doc) => {
      dataSet[doc.id] = doc.data();
    });
    console.log(dataSet);
  };

  useEffect(() => {
    console.log("test");
    const getData = async () => {
      const data = await folderRef.get();
      setFolder(data.data().folder as string[]);
      console.log(data.data());
    };
    getData();
  }, []);

  return (
    <div>
      <h1>単語帳選択ページ</h1>
      <ul>
        {folder.map((val, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setWord(val);
              }}
            >
              {val}
            </li>
          );
        })}
      </ul>
      <Link href="/">
        <button className="mx-auto mb-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </div>
  );
};

export default Select;
