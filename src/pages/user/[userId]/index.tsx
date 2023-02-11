import React, { useEffect } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { prisma } from "../../../server/db";
import profileImagePlaceholder from "../../../assets/images/profile-image-placeholder.png";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import MailIcon from "../../../assets/icons/MailIcon";
import PostCard from "../../../components/PostCard/PostCard";
import { Post } from "../../../types/Post";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getUserPosts } from "../../../redux/thunks/postThunk";
import Loader from "../../../components/Loader/Loader";

export async function getStaticPaths() {
  try {
    const response = await prisma.user.findMany();

    const paths = response.map((user: User) => ({
      params: { userId: user.id.toString() },
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
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: params.userId,
        },
      },
    });

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const ProfilePage = ({ user }: { user: User }) => {
  const session = useSession();
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.userPosts);
  const getUserPostsStatus = useAppSelector(
    (state) => state.post.getUserPostsStatus
  );

  const isLoading = getUserPostsStatus === "loading";

  useEffect(() => {
    console.log("user", user);
    dispatch(getUserPosts(user.id));
  }, [user.id]);

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col gap-4 bg-gray-100">
      <div className="flex flex-col">
        <div className="h-10 w-screen bg-black" />
        <div className="relative flex flex-col gap-3 border-b bg-white px-3 pt-4">
          <div className="absolute top-[-30px] left-3">
            <Image
              src={user?.image || profileImagePlaceholder}
              width={65}
              height={65}
              alt="profile image"
              className="rounded-full border-4 border-black"
            />
          </div>
          <div className="flex justify-end">
            <div>
              {session.data?.user?.id === user?.id ? (
                <SubmitButton text="Edit Profile" />
              ) : (
                <SubmitButton text="Follow" />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-black">{user?.name}</h1>
          <h3 className="italic text-gray-500">No description...</h3>
          <div className="pb-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6">
                <MailIcon />
              </div>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-b bg-white px-3 py-4 shadow">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Education</h4>
            <span>-</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Work</h4>
            <span>-</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          posts?.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
      <div className="flex flex-col gap-2 bg-white">
        <div className="flex w-screen flex-col">
          <h1 className="border-b p-3 text-lg font-bold">Recent comments</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
