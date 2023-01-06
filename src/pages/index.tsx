import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="DEV.to Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-center text-4xl font-bold text-white">
          JULEŁ JEST NAJLEPSY 💖💖
        </h1>
      </main>
    </>
  );
};

export default Home;
