import Link from "next/link";
import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getList } from "src/db/DbProvider";
import { useRouter } from "next/router";
import { Layout } from "src/components/layout";

const Select = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [folder, setFolder] = useState<string[]>([]);

  useEffect(() => {
    const getFolder = async () => {
      if (currentUser) {
        setFolder(await getList(currentUser.uid));
      }
    };
    getFolder();
  }, [currentUser]);

  return (
    <Layout>
      <h1 className="mx-auto my-10 px-20 py-3 border-4 border-green-500 text-3xl bg-green-300">
        単語帳選択
      </h1>
      <ul className="mx-auto ">
        {folder.map((val, i) => {
          return (
            <li
              key={i}
              className="px-24 py-14 h-10 text-center text-3xl flex flex-col justify-center border border-b border-gray-500 bg-gray-300 sm:cursor-pointer sm:hover:bg-gray-100"
              onClick={async () => {
                router.push({
                  pathname: "/card",
                  query: { folder: val },
                });
              }}
            >
              {val}
            </li>
          );
        })}
      </ul>
      <Link href="/">
        <button className="mx-auto my-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </Layout>
  );
};

export default Select;
