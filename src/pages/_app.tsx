import "src/styles/globals.css";
import { AuthProvider } from "src/auth/AuthProvider";

const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    setFillHeight();
  }
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
