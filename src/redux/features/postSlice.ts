import { createSlice } from "@reduxjs/toolkit";

import { IPostSliceState } from "../../types/IPostSliceState";
import {
  bookmarkPost,
  getPost,
  getPostFollowersCount,
  getPosts,
  unbookmarkPost,
  searchPosts,
  getUserPosts,
  blockPost,
  unblockPost,
} from "../thunks/postThunk";

const initialState: IPostSliceState = {
  posts: undefined,
  searchedPosts: undefined,
  post: undefined,
  userPosts: undefined,
  postFollowers: undefined,
  postFollowersCount: undefined,
  getUserPostsStatus: null,
  getPostsStatus: null,
  getPostStatus: null,
  getPostFollowersCountStatus: null,
  searchPostsStatus: null,
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

    // get user posts
    builder.addCase(getUserPosts.pending, (state) => {
      state.getUserPostsStatus = "loading";
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.getUserPostsStatus = "success";
      state.userPosts = action.payload;
      console.log("userPosts", action.payload);
    });
    builder.addCase(getUserPosts.rejected, (state) => {
      state.getUserPostsStatus = "failed";
    });

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

      state.userPosts = state.userPosts?.map((post) => {
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

      state.userPosts = state.userPosts?.map((post) => {
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

    // search posts
    builder.addCase(searchPosts.pending, (state) => {
      state.searchPostsStatus = "loading";
    });
    builder.addCase(searchPosts.fulfilled, (state, action) => {
      state.searchPostsStatus = "success";
      state.searchedPosts = action.payload;

      console.log(action.payload);
    });
    builder.addCase(searchPosts.rejected, (state) => {
      state.searchPostsStatus = "failed";
    });

    // block post
    builder.addCase(blockPost.fulfilled, (state, { payload }) => {
      if (!payload) return;

      state.posts = state.posts?.filter((post) => post.id !== payload);

      if (state.post && state.post.id === payload) {
        state.post.blocked = true;
      }

      state.userPosts = state.userPosts?.map((post) => {
        if (post.id === payload) {
          return {
            ...post,
            blocked: true,
          };
        } else {
          return post;
        }
      });
    });

    // unblock post
    builder.addCase(unblockPost.fulfilled, (state, { payload }) => {
      if (!payload) return;

      if (state.post && state.post.id === payload) {
        state.post.blocked = false;
      }

      state.userPosts = state.userPosts?.map((post) => {
        if (post.id === payload) {
          return {
            ...post,
            blocked: false,
          };
        } else {
          return post;
        }
      });
    });
  },
});

export const { setPost, setPage } = postSlice.actions;

export default postSlice.reducer;
