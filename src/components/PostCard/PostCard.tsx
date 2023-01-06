import Image from "next/image";
import React from "react";

import { IPostCardProps } from "./PostCard.types";
import profileImagePlaceholder from "../../assets/images/profile-image-placeholder.png";
import HeartIcon from "../../assets/icons/HeartIcon";
import CommentIcon from "../../assets/icons/CommentIcon";
import BookmarkIcon from "../../assets/icons/BookmarkIcon";

const PostCard = ({ post }: IPostCardProps) => {
  const { title, author, createdAt } = post;
  const { name, image } = author;

  return (
    <div className="flex w-full flex-col gap-2 bg-white p-4 shadow">
      <div className="flex items-center gap-2">
        <Image
          src={image || profileImagePlaceholder}
          alt="Profile picture"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs">{createdAt.toString()}</p>
        </div>
      </div>
      <main>
        <h1 className="text-lg font-bold">{title}</h1>
      </main>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div className=" cursor-pointer rounded p-2 hover:bg-gray-100">
            <div className="h-4 w-4">
              <HeartIcon />
            </div>
          </div>
          <div className=" cursor-pointer rounded p-2 hover:bg-gray-100">
            <div className="h-4 w-4">
              <CommentIcon />
            </div>
          </div>
        </div>
        <div className=" cursor-pointer rounded p-2 hover:bg-blue-200">
          <div className="h-3 w-3">
            <BookmarkIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
