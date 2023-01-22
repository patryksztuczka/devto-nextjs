import { createSlice } from "@reduxjs/toolkit";

import { IPostSliceState } from "../../types/IPostSliceState";
import {
  bookmarkPost,
  getPost,
  getPosts,
  unbookmarkPost,
} from "../thunks/postThunk";

const initialState: IPostSliceState = {
  posts: undefined,
  post: null,
  currentPostReactions: undefined,
  getPostsStatus: null,
  getPostStatus: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.post = payload.post;
      state.currentPostReactions = payload.bookmarksCount;
      console.log("setPost", state.post);
      console.log("setPost", state.currentPostReactions);
    },
  },
  extraReducers: (builder) => {
    // get posts
    builder.addCase(getPosts.pending, (state) => {
      state.getPostsStatus = "loading";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.getPostsStatus = "success";
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.getPostsStatus = "failed";
    });

    // get post by id
    builder.addCase(getPost.pending, (state) => {
      state.getPostStatus = "loading";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.getPostStatus = "success";
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state) => {
      state.getPostStatus = "failed";
    });

    // bookmark post
    builder.addCase(bookmarkPost.fulfilled, (state, { payload }) => {
      if (!payload) return;
      if (
        state.post &&
        state.post.id === payload.postId &&
        state.currentPostReactions !== undefined
      ) {
        state.post.bookmarks = [...(state.post.bookmarks || []), payload];
        state.currentPostReactions = state.currentPostReactions + 1;
      }

      state.posts = state.posts?.map((post) => {
        if (post.id === payload.postId) {
          return {
            ...post,
            bookmarks: [...(post.bookmarks || []), payload],
          };
        } else {
          return post;
        }
      });
    });

    // unbookmark post
    builder.addCase(unbookmarkPost.fulfilled, (state, { payload }) => {
      if (!payload) return;
      if (
        state.post &&
        state.post.id === payload.postId &&
        state.currentPostReactions !== undefined
      ) {
        state.post.bookmarks = state.post.bookmarks?.filter(
          (bookmark) => bookmark.postId !== payload.postId
        );
        state.currentPostReactions = state.currentPostReactions - 1;
      }

      state.posts = state.posts?.map((post) => {
        if (post.id === payload.postId) {
          return {
            ...post,
            bookmarks: post.bookmarks?.filter(
              (bookmark) => bookmark.postId !== payload.postId
            ),
          };
        } else {
          return post;
        }
      });
    });
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
