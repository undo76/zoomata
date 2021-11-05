import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Zoomata</title>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter"
          />
          <meta name="description" content="A cellular automata zoo." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
