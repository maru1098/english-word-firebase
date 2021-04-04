import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layout";
import { useContext } from "react";
import { useRouter } from "next/router";

import { auth } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";

const PAGES = [
  {
    href: "/login",
    file: "/login.tsx",
    label: "ログインページ",
    isDone: true,
  },
  {
    href: "/card",
    file: "card.tsx",
    label: "単語カード",
    isDone: false,
  },
  {
    href: "/registration",
    file: "/registration.tsx",
    label: "単語登録ページ",
    isDone: false,
  },
  {
    href: "/quiz",
    file: "/quiz.tsx",
    label: "問題出題ページ",
    isDone: false,
  },
  {
    href: "/select",
    file: "/select.tsx",
    label: "単語帳選択ページ",
    isDone: false,
  },
] as const;

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  // currentUser === null && router.push("/login");
  // }, [currentUser]);
  const logOut = async () => {
    try {
      await auth.signOut();
      // router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      <div className="p-4">
        <h2>ページ一覧</h2>
        <ul className="mt-2 grid gap-4 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PAGES.map((page) => {
            return (
              <li key={page.href}>
                <Link href={page.href}>
                  <a className="block p-3 border border-black">
                    <div>{`${page.isDone ? "✅" : ""}${page.label}`}</div>
                    <div>pages{page.file}のページです</div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
        <button onClick={logOut}>Logout</button>
      </div>
    </Layout>
  );
};

export default Home;
