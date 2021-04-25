import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useState, useRef, useEffect } from "react";
import { registWord, getList } from "src/db/DbProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";
import { Button } from "src/components/Button";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Registration = () => {
  const { currentUser } = useContext(AuthContext);
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const [createFolder, setCreateFolder] = useState<string>("");
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);
  const englishRef: React.RefObject<HTMLInputElement> = useRef();
  const japaneseRef: React.RefObject<HTMLInputElement> = useRef();

  const handleRegist = async () => {
    await registWord(currentUser.uid, createFolder, english, japanese);
    alert(`${english}が登録されました`);
    englishRef.current.value = "";
    japaneseRef.current.value = "";
  };
  useEffect(() => {
    const getFolder = async () => {
      setCurrentFolder(await getList(currentUser.uid));
    };
    getFolder();
  }, []);

  return (
    <Layout>
      <Title>単語登録</Title>
      {currentFolder.map((val, i) => {
        return (
          <Disclosure key={i}>
            <Disclosure.Button className="py-2">{val}</Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              foofoofoofoo
            </Disclosure.Panel>
          </Disclosure>
        );
      })}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <span>Is team pricing available?</span>
              {/*
              Use the `open` render prop to rotate the icon when the panel is open
            */}
              <ChevronRightIcon
                className={`${open ? "transform rotate-90" : ""}`}
              />
            </Disclosure.Button>

            <Disclosure.Panel>{/* ... */}</Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <label htmlFor="folder" className="m-1 text-2xl">
        単語帳名
      </label>
      <input
        id="folder"
        className="p-2 w-52 shadow border"
        type="text"
        placeholder="単語帳の名前を入力"
        onChange={(e) => setCreateFolder(e.target.value)}
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
      <Button onClick={() => handleRegist()}>登録</Button>
    </Layout>
  );
};

export default Registration;
