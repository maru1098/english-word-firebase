import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layout";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";
import { Button } from "src/components/Button";
import { Title } from "src/components/Title";

const PAGES = [
  {
    href: "/registration",
    label: "単語登録",
  },
  {
    href: "/select",
    label: "単語帳を選ぶ",
  },
  {
    href: "/quiz",
    label: "問題を解く",
  },
] as const;

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser === null && router.push("/login");
  }, [currentUser]);

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      <Title>メニュー</Title>
      <ul className="grid grid-rows-3 gap-4">
        {PAGES.map((page) => {
          return (
            <li key={page.href}>
              <Link href={page.href}>
                <a className="block py-5 px-20 border-4 text-center bg-gray-100 border-green-300 sm:hover:bg-green-200">
                  <div className="text-xl">{`${page.label}`}</div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <Button onClick={logOut}>Logout</Button>
    </Layout>
  );
};

export default Home;
