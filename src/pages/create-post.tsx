import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
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
      await axios.post("http://localhost:3000/api/create", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex h-[calc(100vh-56px)] flex-col gap-4 pt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 px-4">
        <CoverImageUpload />
        <div>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
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
        <div className="h-full px-4">
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
        <div className="flex h-14 items-center bg-gray-200 px-2">
          <SubmitButton text="Publish" />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
