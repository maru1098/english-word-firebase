import React, { useEffect, useState, FC, useContext } from "react";
import Link from "next/link";
import { Layout } from "src/components/layout";
import { useRouter } from "next/router";

import { auth } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";
import { Button } from "src/components/Button";

const Login: FC = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    currentUser && router.push("/");
  }, [currentUser]);

  const logIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout className="justify-center">
      <label htmlFor="email" className=" mb-1 text-2xl ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Email
      </label>
      <input
        id="email"
        className="p-2 w-52 shadow border"
        type="email"
        placeholder="メールアドレス"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="row-start-5 mt-5 mb-1 text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
        Password
      </label>
      <input
        id="password"
        className="p-2 w-52 shadow border"
        type="password"
        placeholder="パスワード"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={logIn}>Login</Button>
      <Link href="/signup">
        <a className="underline text-blue-800">初めての方はこちら</a>
      </Link>
    </Layout>
  );
};

export default Login;
