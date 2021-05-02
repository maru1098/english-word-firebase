import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "src/auth/AuthProvider";
import { Layout } from "src/components/layout";
import { Title } from "src/components/Title";
import { setWord } from "src/db/DbProvider";
import { useRouter } from "next/router";
import { AddDialog } from "src/components/AddDialog";
import { Button } from "src/components/Button";

const Quiz = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [wordData, setWordData] = useState<{
    [key: string]: { [key: string]: string | boolean };
  }>({});
  const wordsKey = Object.keys(wordData);
  const [answer, setAnswer] = useState<string>();
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [question, setQuestion] = useState<string[]>();
  const [open, setOpen] = useState(true);
  const answerRef: React.RefObject<HTMLInputElement> = useRef();
  const isFinish = currentNum === wordsKey.length && wordsKey.length !== 0;

  useEffect(() => {
    const getWord = async () => {
      if (currentUser) {
        setWordData(await setWord(currentUser.uid, router.query.folder));
      }
    };
    getWord();
  }, [currentUser]);
  useEffect(() => {
    setQuestion(
      wordsKey.map((english, i) => {
        return wordData[wordsKey[i]].japanese;
      }) as string[]
    );
  }, [wordData]);

  useEffect(() => {
    if (isFinish) {
      setOpen(false);
    }
  }, [isFinish]);

  const nextQuestion = () => {
    if (answer === wordsKey[currentNum]) {
      answerRef.current.value = "";
      setCurrentNum((currentNum) => currentNum + 1);
      answerRef.current.focus();
    }
  };

  return (
    <Layout>
      <Title>問題出題</Title>
      <AddDialog
        open={open}
        setOpen={setOpen}
        title={question ? question[currentNum] : ""}
      >
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="answer" className="mt-5">
            英語を入力！
          </label>
          <input
            id="answer"
            ref={answerRef}
            className="p-2 w-52 shadow border"
            type="text"
            placeholder="回答を入力"
            autoComplete="off"
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                nextQuestion();
              }
            }}
          />
        </div>
        {/* <div className="text-center">
          <Button
          onClick={() => {
            nextQuestion();
          }}
          >
          OK
          </Button>
        </div> */}
      </AddDialog>
      {console.log(isFinish, wordsKey.length)}
      {isFinish ? (
        <></>
      ) : open ? (
        <></>
      ) : (
        <Button
          className=" my-auto"
          onClick={() => {
            setOpen(true);
          }}
        >
          問題に戻る
        </Button>
      )}
    </Layout>
  );
};

export default Quiz;
