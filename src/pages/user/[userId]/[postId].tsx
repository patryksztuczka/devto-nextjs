import React from "react";
import Image from "next/image";
import { format } from "date-fns";

import { prisma } from "../../../server/db";
import { Post } from "../../../types/Post";
import profileImagePlaceholder from "../../../assets/images/profile-image-placeholder.png";
import HeartIcon from "../../../assets/icons/HeartIcon";
import CommentIcon from "../../../assets/icons/CommentIcon";
import BookmarkIcon from "../../../assets/icons/BookmarkIcon";

export async function getStaticPaths() {
  try {
    const response = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    const paths = response.map((post: Post) => ({
      params: {
        userId: post.authorId.toString(),
        postId: post.id.toString(),
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: {
          equals: params.postId,
        },
      },
      include: {
        author: true,
      },
    });

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const PostPage = ({ post }: { post: Post }) => {
  return (
    <div className="relative flex flex-col gap-6 p-3">
      <div className="flex items-center gap-3">
        <Image
          src={post.author?.image || profileImagePlaceholder}
          width={40}
          height={40}
          alt="profile picture"
          className="rounded-full"
        />
        <div className=" flex flex-col gap-1">
          <h3 className="font-bold">{post.author?.name}</h3>
          <span className="text-xs text-gray-500">{`Posted on ${format(
            post.createdAt,
            "dd MMMM yyyy"
          )}`}</span>
        </div>
      </div>
      <main className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="whitespace-pre-line text-lg">{post.body}</p>
      </main>
      <div className="fixed bottom-0 left-0 flex h-14 w-screen items-center justify-around rounded-md shadow-top">
        <div className="h-6 w-6">
          <HeartIcon />
        </div>
        <div className="h-6 w-6">
          <CommentIcon />
        </div>
        <div className="h-5 w-5">
          <BookmarkIcon />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
