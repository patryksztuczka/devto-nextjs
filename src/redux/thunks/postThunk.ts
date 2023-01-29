import { PostFollower } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (skip: number) => {
    try {
      const { data } = await axios.get("/api/posts?skip=" + skip);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId: string) => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "post/bookmarkPost",
  async (postFollower: PostFollower) => {
    try {
      const { data } = await axios.post("/api/posts/bookmark", postFollower);

      return data as PostFollower;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unbookmarkPost = createAsyncThunk(
  "post/unbookmarkPost",
  async (postFollower: PostFollower) => {
    try {
      const { data } = await axios.post("/api/posts/unbookmark", postFollower);

      return data as PostFollower;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostFollowersCount = createAsyncThunk(
  "post/getPostFollowersCount",
  async (postId: string) => {
    try {
      const { data } = await axios.get(
        `/api/posts-followers/followers-count/${postId}`
      );

      return data as PostFollower[];
    } catch (error) {
      console.log(error);
    }
  }
);
