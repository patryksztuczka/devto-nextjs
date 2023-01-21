import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import PostCard from "../components/PostCard/PostCard";
import { Post } from "../types/Post";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data } = await axios.get("/api/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Dev.to Clone</title>
        <meta name="description" content="DEV.to Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-56px)] flex-col bg-gray-100">
        <div className="flex w-full flex-col gap-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
