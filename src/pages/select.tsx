import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getList } from "src/db/DbProvider";
import { useRouter } from "next/router";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";

const Select = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);

  useEffect(() => {
    const getFolder = async () => {
      if (currentUser) {
        setCurrentFolder(await getList(currentUser.uid));
      }
    };
    getFolder();
  }, [currentUser]);

  return (
    <Layout>
      <Title>単語帳選択</Title>
      <ul className="grid grid-cols-7 sm:grid-cols-3">
        {currentFolder.map((val, i) => {
          return (
            <li
              key={i}
              className="mb-2 col-start-2 col-end-7 py-8 text-center text-2xl border border-gray-500 bg-gray-300 sm:col-end-3 sm:cursor-pointer sm:hover:bg-gray-100"
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
    </Layout>
  );
};

export default Select;
