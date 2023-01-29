import { createSlice } from "@reduxjs/toolkit";

import { IPostSliceState } from "../../types/IPostSliceState";
import {
  bookmarkPost,
  getPost,
  getPostFollowersCount,
  getPosts,
  unbookmarkPost,
} from "../thunks/postThunk";

const initialState: IPostSliceState = {
  posts: undefined,
  post: undefined,
  postFollowers: undefined,
  postFollowersCount: undefined,
  getPostsStatus: null,
  getPostStatus: null,
  getPostFollowersCountStatus: null,
  page: 0,
  isMorePosts: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.post = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    // get posts
    builder.addCase(getPosts.pending, (state) => {
      state.getPostsStatus = "loading";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.getPostsStatus = "success";
      if (!action.payload) return;

      if (state.page === 0) {
        state.posts = action.payload.posts.value;
      } else if (state.posts !== undefined && state.page > 0) {
        state.posts = [...state.posts, ...action.payload.posts.value];
      }

      if (action.payload.total.value._count.published && state.posts) {
        state.isMorePosts =
          action.payload.total.value._count.published > state.posts.length;
      }
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
        state.postFollowersCount !== undefined
      ) {
        state.postFollowers = [...(state.postFollowers || []), payload];
        state.postFollowersCount = state.postFollowersCount + 1;
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
        state.postFollowersCount !== undefined
      ) {
        state.postFollowers = state.post.bookmarks?.filter(
          (bookmark) => bookmark.postId !== payload.postId
        );
        state.postFollowersCount = state.postFollowersCount - 1;
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

    // get post followers count
    builder.addCase(getPostFollowersCount.pending, (state) => {
      state.getPostFollowersCountStatus = "loading";
    });
    builder.addCase(getPostFollowersCount.fulfilled, (state, action) => {
      state.getPostFollowersCountStatus = "success";
      state.postFollowers = action.payload;
      state.postFollowersCount = action.payload?.length;
    });
    builder.addCase(getPostFollowersCount.rejected, (state) => {
      state.getPostFollowersCountStatus = "failed";
    });
  },
});

export const { setPost, setPage } = postSlice.actions;

export default postSlice.reducer;
