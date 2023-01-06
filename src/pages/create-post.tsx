import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import CoverImageUpload from "../components/CoverImageUpload/CoverImageUpload";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { ICreatePostFormValues } from "../types/ICreatePostFormValues";

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostFormValues>();

  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<ICreatePostFormValues> = async ({
    title,
    body,
  }) => {
    if (!session?.user) return;

    const data = {
      title,
      body,
      authorId: session?.user?.id,
      published: true,
    };

    try {
      await axios.post("/api/create", data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={"flex h-[calc(100vh-56px)] flex-col gap-4 pt-4"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.values(errors).length > 0 && (
        <div className="flex flex-col bg-red-100 p-4">
          <h1 className="text-lg font-bold text-red-700">
            Whoops, something went wrong:
          </h1>
          <ul>
            {Object.values(errors).map((error) => (
              <li key={error.type} className="text-red-700">
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-4 px-4">
        <CoverImageUpload />
        <div>
          <Controller
            control={control}
            name="title"
            rules={{
              required: {
                value: true,
                message: "Title is required",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                placeholder="New post title here..."
                className="w-full text-3xl font-bold outline-none placeholder:text-gray-600"
                value={value}
                onChange={onChange}
                maxLength={60}
              />
            )}
          />
        </div>
      </div>
      <div className="flex h-14 bg-gray-100" />
      <div className="flex h-full flex-col">
        <div className="h-[calc(100%-56px)] px-4">
          <Controller
            control={control}
            name="body"
            render={({ field: { value, onChange } }) => (
              <textarea
                placeholder="Write your post content here..."
                className="flex h-full w-full resize-none text-lg outline-none placeholder:text-gray-600"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="fixed bottom-0 left-0 flex h-14 w-full items-center bg-gray-200 px-2">
          <SubmitButton text="Publish" />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
