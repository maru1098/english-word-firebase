import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useState, useEffect, Fragment } from "react";
import { getList, registFolder, deleteFolder } from "src/db/DbProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";
import { Button } from "src/components/Button";
import { Disclosure } from "@headlessui/react";
import { WordList } from "src/components/WordList";
import { FolderRemoveIcon, FolderAddIcon } from "@heroicons/react/outline";
import { AddDialog } from "src/components/AddDialog";

const Registration = () => {
  const { currentUser } = useContext(AuthContext);
  const [createFolder, setCreateFolder] = useState<string>("");
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const getFolder = async () => {
      if (currentUser) {
        setCurrentFolder(await getList(currentUser.uid));
      }
    };
    getFolder();
    setIsChange(false);
  }, [currentUser, isChange]);

  return (
    <Layout>
      <Title>単語登録</Title>
      {currentFolder.map((val, i) => {
        return (
          <Disclosure key={i}>
            <div className="flex items-center">
              <Disclosure.Button className="rounded-full my-1 py-2 px-5 col-start-2 col-end-4 border-4 text-center bg-gray-100 border-green-300 sm:hover:bg-green-200 sm:col-start-2 sm:col-end-3">
                {val}
              </Disclosure.Button>
              <FolderRemoveIcon
                className="cursor-pointer h-10 w-10 ml-3 p-2 sm:hover:bg-red-400 rounded-full"
                onClick={async () => {
                  await deleteFolder(currentUser.uid, val);
                  setIsChange(true);
                }}
              />
            </div>
            <Disclosure.Panel>
              <WordList uid={currentUser.uid} folder={val} />
            </Disclosure.Panel>
          </Disclosure>
        );
      })}

      <FolderAddIcon
        className="cursor-pointer my-2 h-16 w-16 p-2 rounded-full border-4 border-yellow-300 bg-gray-100 sm:hover:bg-yellow-100"
        onClick={() => setOpen(true)}
      />

      <AddDialog open={open} setOpen={setOpen} title="新しい単語帳を追加">
        <div className="flex flex-col justify-center items-center">
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
        </div>
        <div className="text-center">
          <Button
            onClick={async () => {
              await registFolder(currentUser.uid, createFolder);
              setIsChange(true);
              setOpen(false);
            }}
          >
            登録
          </Button>
        </div>
      </AddDialog>
    </Layout>
  );
};

export default Registration;
