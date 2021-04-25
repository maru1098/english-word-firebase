import { AuthContext } from "src/auth/AuthProvider";
import { useContext, useState, useRef, useEffect, Fragment } from "react";
import { registWord, getList } from "src/db/DbProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";
import { Button } from "src/components/Button";
import { Disclosure, Dialog, Transition } from "@headlessui/react";
import { WordList } from "src/components/WordList";
import { FolderRemoveIcon, FolderAddIcon } from "@heroicons/react/outline";

const Registration = () => {
  const { currentUser } = useContext(AuthContext);
  const [english, setEnglish] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");
  const [createFolder, setCreateFolder] = useState<string>("");
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
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
      if (currentUser) {
        setCurrentFolder(await getList(currentUser.uid));
      }
    };
    getFolder();
  }, [currentUser]);

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
              <FolderRemoveIcon className="h-6 w-6 ml-3" />
            </div>
            <Disclosure.Panel>
              <WordList uid={currentUser.uid} folder={val} />
            </Disclosure.Panel>
          </Disclosure>
        );
      })}

      <FolderAddIcon
        className="my-2 h-16 w-16 p-2 rounded-full border-4 border-yellow-300 bg-gray-100"
        onClick={() => setOpen(true)}
      />

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          static
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:max-w-sm">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 p-2 text-center rounded-full bg-green-200 text-gray-900"
                >
                  新しい単語帳を追加
                </Dialog.Title>
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
                  <Button onClick={() => setOpen(false)}>登録</Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* <Dialog
        className="fixed z-10 inset-0 overflow-y-auto "
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="grid grid-rows-3 grid-cols-3 min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="row-start-2 row-end-3 col-start-2 col-end-3 bg-white">
            <Dialog.Title className="text-lg font-medium">
              新しい単語帳を追加
            </Dialog.Title>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="folder" className="m-1 text-2xl">
                単語帳名
              </label>
              <input
                id="folder"
                className="mx-5 p-2 w-52 shadow border"
                type="text"
                placeholder="単語帳の名前を入力"
                onChange={(e) => setCreateFolder(e.target.value)}
              />
            </div>
            <Button onClick={() => setOpen(false)}>登録</Button>
          </div>
        </div>
      </Dialog> */}
    </Layout>
  );
};

export default Registration;
