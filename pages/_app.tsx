import { Seo } from "@/components/Seo";
import { useFathom } from "@/hooks";
import "@/styles/index.css";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "@next/font/google";
import { AppProps } from "next/app";
import Head from "next/head";

const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "700"] });
const ibmPlexSerif = IBM_Plex_Serif({ subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "700"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  useFathom();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Seo />

      <style jsx global>{`
        :root {
          --font-ibm-plex-mono: ${ibmPlexMono.style.fontFamily};
          --font-ibm-plex-sans: ${ibmPlexSans.style.fontFamily};
          --font-ibm-plex-serif: ${ibmPlexSerif.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
