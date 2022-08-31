import { AppProps } from "next/app";
import Head from "next/head";
import { Seo } from "../components/Seo";
import { useFathom } from "../hooks";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useFathom();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Seo />

      <Component {...pageProps} />
    </>
  );
}
