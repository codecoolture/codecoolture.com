import { gray, grayDark, indigo, indigoDark, yellow, yellowDark } from "@radix-ui/colors";
import { Analytics } from "@vercel/analytics/next";
import { AppProps } from "next/app";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import Head from "next/head";

import { Seo } from "@/components/Seo";
import { useFathom } from "@/hooks";

import "@/styles/index.css";

const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "700"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

const colorSetToCssVariables = (colorSet: Record<string, string>) => {
  return Object.entries(colorSet)
    .map(([key, value]) => {
      const colorName = key.replaceAll(/\d/g, ""); // Extract color name without numbers
      const colorNumber = key.replaceAll(/\D/g, ""); // Extract only the numbers

      return `--c-${colorName}-${colorNumber}: ${value};`;
    })
    .join("\n");
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useFathom();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="https://mastodon.world/@codecoolture" rel="me" />
      </Head>

      <Seo />

      <style jsx global>{`
        :root {
          --font-ibm-plex-mono: ${ibmPlexMono.style.fontFamily};
          --font-ibm-plex-sans: ${ibmPlexSans.style.fontFamily};
          --font-ibm-plex-serif: ${ibmPlexSerif.style.fontFamily};

          ${[grayDark, indigoDark, yellowDark].map(colorSetToCssVariables).join("\n")}
        }

        @media (prefers-color-scheme: light) {
          :root {
            ${[gray, indigo, yellow].map(colorSetToCssVariables).join("\n")}
          }
        }
      `}</style>

      <Component {...pageProps} />

      <Analytics />
    </>
  );
}
