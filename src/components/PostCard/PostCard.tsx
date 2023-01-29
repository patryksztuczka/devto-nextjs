import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { IPostCardProps } from "./PostCard.types";
import profileImagePlaceholder from "../../assets/images/profile-image-placeholder.png";
import HeartIcon from "../../assets/icons/HeartIcon";
import CommentIcon from "../../assets/icons/CommentIcon";
import BookmarkIcon from "../../assets/icons/BookmarkIcon";
import CheckedBookmarkIcon from "../../assets/icons/CheckedBookmarkIcon";
import { useAppDispatch } from "../../hooks/useRedux";
import { bookmarkPost, unbookmarkPost } from "../../redux/thunks/postThunk";
import { PostFollower } from "@prisma/client";

const PostCard = ({ post, lastPost }: IPostCardProps) => {
  const dispatch = useAppDispatch();
  const { data } = useSession();

  const { title, author, createdAt, bookmarks } = post;

  const handleBookmark = () => {
    let postFollower: PostFollower;
    const bookmark = bookmarks?.find(
      (bookmark) => bookmark.userId === data?.user?.id
    );

    if (bookmark) {
      dispatch(unbookmarkPost(bookmark));
    } else {
      postFollower = {
        userId: data?.user?.id as string,
        postId: post.id,
      };

      dispatch(bookmarkPost(postFollower));
    }
  };

  return (
    <div
      ref={lastPost}
      className="flex w-full flex-col gap-2 bg-white p-4 shadow"
    >
      <div className="flex items-center gap-2">
        <Link href={`/user/${author?.id}`}>
          <Image
            src={author?.image || profileImagePlaceholder}
            alt="Profile picture"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/user/${author?.id}`}>
            <h3 className="text-sm font-medium text-gray-700 hover:text-black">
              {author?.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-700">{createdAt?.toString()}</p>
        </div>
      </div>
      <main>
        <Link href={`/user/${author?.id}/${post.id}`}>
          <h1 className="w-fit cursor-pointer text-lg font-bold hover:text-blue-800">
            {title}
          </h1>
        </Link>
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
        <div
          className=" cursor-pointer rounded p-2 hover:bg-blue-200"
          onClick={handleBookmark}
        >
          {data?.user && (
            <div className="h-3 w-3">
              {bookmarks?.find(
                (bookmark) => bookmark.userId === data?.user?.id
              ) ? (
                <CheckedBookmarkIcon />
              ) : (
                <BookmarkIcon />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
