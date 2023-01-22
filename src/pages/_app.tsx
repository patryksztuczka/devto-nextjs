import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "../redux/store";
import MainLayout from "../layouts/MainLayout/MainLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
