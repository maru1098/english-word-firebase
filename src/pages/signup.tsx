import { FC, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "src/utils/firebase";
import { AuthContext } from "src/auth/AuthProvider";

const SignUp: FC = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    currentUser && router.push("/");
  }, [currentUser]);

  const createUser = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
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
            password:{" "}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" onClick={createUser}>
          SignUp
        </button>
      </div>
      <Link href="/login">
        <a className="auth-link">Login</a>
      </Link>
    </div>
  );
};

export default SignUp;
