import "../styles/globals.css";
import React, { ReactChildren } from "react";
import { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";

const components = {
  wrapper: (props: { children: ReactChildren }) => (
    <div className="prose">{props.children}</div>
  ),
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default MyApp;
