import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  public render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />

          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡️</text></svg>"
          />
        </Head>

        <body>
          <Main />

          <NextScript />

          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "6efcdbbf14834302a919baeeb3e0b0a8"}'
          />
        </body>
      </Html>
    );
  }
}
