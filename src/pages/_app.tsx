import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontSans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
