import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider"
import 'antd/dist/reset.css';
export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}