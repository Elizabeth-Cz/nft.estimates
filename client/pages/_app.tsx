import "../styles/globals.css";
import "../styles/responsive.style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Common } from "@RESOURCES/translations/english/common";
import { ThemeScope } from "../styles/theme";
import { Pages } from "./pages.types";
import { Layout } from "@UI/Layout/Layout";

const externalStylesheets = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
];

function NFTEApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeScope>
      <Head>
        {/*<title>{Common.NftEstimates}</title>*/}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="description" content={Common.NftEstimates} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {externalStylesheets.map((sheetHref, index) => (
          <link rel="stylesheet" href={sheetHref} key={index} />
        ))}
      </Head>
      <Layout page={Pages.Asset}>
        <Component {...pageProps} />
      </Layout>
    </ThemeScope>
  );
}

export default NFTEApp;
