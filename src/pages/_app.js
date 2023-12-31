import Layout from '@/components/layout/layout';
import { AuthContextProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>,
    );
  }
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
