import React from "react";
import "../styles/globals.css";
import Default from "../layouts/default/default";
import { ThemeProvider } from "@material-ui/styles";

const layouts = {
  defaultLayout: Default,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
