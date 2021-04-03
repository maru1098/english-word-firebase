import Link from "next/link";
import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getList, setWord } from "src/db/DbProvider";

const Select = () => {
  const { currentUser } = useContext(AuthContext);
  const [folder, setFolder] = useState<string[]>([]);

  useEffect(() => {
    const getFolder = async () => {
      setFolder(await getList(currentUser.uid));
    };
    getFolder();
  }, []);

  return (
    <div>
      <h1>単語帳選択ページ</h1>
      <ul>
        {folder.map((val, i) => {
          return (
            <li
              key={i}
              onClick={async () => {
                await setWord(currentUser.uid, val);
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
