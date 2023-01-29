import React from "react";
import { isEmpty } from "lodash";

import Loader from "../components/Loader/Loader";
import PostCard from "../components/PostCard/PostCard";
import SearchInput from "../components/SearchInput/SearchInput";
import { useAppSelector } from "../hooks/useRedux";
import NoSearchedPostsState from "../components/NoSearchedPostsState/NoSearchedPostsState";

const SearchPage = () => {
  const posts = useAppSelector((state) => state.post.searchedPosts);
  const searchPostsStatus = useAppSelector(
    (state) => state.post.searchPostsStatus
  );

  const isLoading = searchPostsStatus === "loading";

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col bg-gray-100">
      <div className="border-b p-3">
        <SearchInput />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : !isEmpty(posts) ? (
          posts?.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <NoSearchedPostsState />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
