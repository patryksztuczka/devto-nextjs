import { Post } from "./Post";
import { TStatus } from "./TStatus";

export interface IPostSliceState {
  posts: Post[] | undefined;
  post: Post | undefined;
  postFollowersCount: number | undefined;
  getPostsStatus: TStatus;
  getPostStatus: TStatus;
  getPostFollowersCountStatus: TStatus;
}
