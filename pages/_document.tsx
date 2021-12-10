import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  public render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="UTF-8" />

          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/static/img/favicon-64.png" type="image/png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
