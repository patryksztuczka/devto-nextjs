import { useRef, useCallback } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { isEmpty } from "lodash";

import PostCard from "../components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Loader from "../components/Loader/Loader";
import { setPage } from "../redux/features/postSlice";
import { usePostsSearch } from "../hooks/usePostsSearch";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const observer = useRef<IntersectionObserver>();

  const posts = useAppSelector((state) => state.post.posts);
  const getPostsStatus = useAppSelector((state) => state.post.getPostsStatus);
  const pageNumber = useAppSelector((state) => state.post.page);
  const isMorePosts = useAppSelector((state) => state.post.isMorePosts);

  const isLoading = getPostsStatus === "loading";

  const lastPost = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries: any) => {
        if (entries[0].isIntersecting && isMorePosts) {
          dispatch(setPage(pageNumber + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, isLoading, pageNumber, isMorePosts]
  );

  usePostsSearch();

  return (
    <>
      <Head>
        <title>Dev.to Clone</title>
        <meta name="description" content="DEV.to Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-56px)] flex-col bg-gray-100">
        <div className="flex w-full flex-col gap-2">
          {isLoading && isEmpty(posts) ? (
            <div className="flex h-screen items-center justify-center">
              <Loader />
            </div>
          ) : (
            posts?.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <PostCard key={post.id} post={post} lastPost={lastPost} />
                );
              } else {
                return <PostCard key={post.id} post={post} />;
              }
            })
          )}
          {isLoading && !isEmpty(posts) && (
            <div className="flex items-center justify-center py-4">
              <Loader />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
