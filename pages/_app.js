import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import { SSRProvider } from "@react-aria/ssr";
import "aos/dist/aos.css";
function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </SSRProvider>
  );
}

export default MyApp;
