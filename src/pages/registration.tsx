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
            <div className="flex items-center mx-auto">
              <Disclosure.Button className="ml-10 rounded-full mb-2 py-2 px-5 border-4 text-center bg-gray-100 border-green-300 sm:hover:bg-green-200 sm:col-start-2 sm:col-end-3">
                {val}
              </Disclosure.Button>
              <FolderRemoveIcon
                className="mr-10 flex-shrink-0 cursor-pointer rounded-full h-8 w-8 ml-2 p-1 border-2 border-red-400 sm:hover:bg-red-200 "
                color="red"
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
        className="cursor-pointer mt-5 mb-10 h-16 w-16 p-2 rounded-full border-4 border-yellow-300 bg-gray-100 sm:hover:bg-yellow-100"
        onClick={() => setOpen(true)}
      />

      <AddDialog open={open} setOpen={setOpen} title="新しい単語帳を追加">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="folder" className="m-1 text-xl">
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
