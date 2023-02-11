import { PostFollower } from "@prisma/client";

import { Post } from "./Post";
import { TStatus } from "./TStatus";

export interface IPostSliceState {
  posts: Post[] | undefined;
  searchedPosts: Post[] | undefined;
  userPosts: Post[] | undefined;
  post: Post | undefined;
  postFollowers: PostFollower[] | undefined;
  postFollowersCount: number | undefined;
  getUserPostsStatus: TStatus;
  getPostsStatus: TStatus;
  getPostStatus: TStatus;
  getPostFollowersCountStatus: TStatus;
  searchPostsStatus: TStatus;
  page: number;
  isMorePosts: boolean;
}
