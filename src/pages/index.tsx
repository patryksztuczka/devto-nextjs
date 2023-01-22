import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import PostCard from "../components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getPosts } from "../redux/thunks/postThunk";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Dev.to Clone</title>
        <meta name="description" content="DEV.to Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-56px)] flex-col bg-gray-100">
        <div className="flex w-full flex-col gap-2">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
