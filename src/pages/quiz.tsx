import Link from "next/link";
const Quiz = () => {
  return (
    <div>
      <h1>問題出題ページ</h1>
      <Link href="/">
        <button className="mx-auto mb-14 w-32 h-10 rounded-full shadow bg-green-300 sm:hover:bg-green-400">
          ホームへ
        </button>
      </Link>
    </div>
  );
};

export default Quiz;
