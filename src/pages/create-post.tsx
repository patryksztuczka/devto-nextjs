import React from "react";
import CoverImageUpload from "../components/CoverImageUpload/CoverImageUpload";
import SubmitButton from "../components/SubmitButton/SubmitButton";

const CreatePost = () => {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col gap-4 pt-4">
      <div className="flex flex-col gap-4 px-4">
        <CoverImageUpload />
        <div>
          <input
            type="text"
            placeholder="New post title here..."
            className="text-3xl font-bold outline-none placeholder:text-gray-600"
            maxLength={100}
          />
        </div>
      </div>
      <div className="flex h-14 bg-gray-100" />
      <div className="flex h-full flex-col">
        <div className="h-full px-4">
          <textarea
            placeholder="Write your post content here..."
            className="flex h-full w-full resize-none text-lg outline-none placeholder:text-gray-600"
          />
        </div>
        <div className="flex h-14 items-center bg-gray-200 px-2">
          <SubmitButton text="Publish" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
