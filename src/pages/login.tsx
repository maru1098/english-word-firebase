import React, { useEffect, useState, FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";

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
    <div className="wrapper">
      <div className="auth">
        <div>
          <label htmlFor="email" className="auth-label">
            Email:{" "}
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="auth-label">
            Password:{" "}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" onClick={logIn}>
          Login
        </button>
      </div>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
    </div>
  );
};

export default Login;
