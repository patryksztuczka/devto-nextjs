import React from "react";
import Image from "next/image";

import noPostsFoundImage from "../../assets/images/no-searched-posts.jpg";

const NoSearchedPostsState = () => {
  return (
    <div className="flex flex-col bg-white py-3 shadow">
      <Image src={noPostsFoundImage} alt="No posts found" />
      <h2 className="w-full text-center text-xl font-semibold">
        No posts found with given query.
      </h2>
    </div>
  );
};

export default NoSearchedPostsState;
