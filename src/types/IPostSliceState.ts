import { Post } from "./Post";
import { TStatus } from "./TStatus";

export interface IPostSliceState {
  posts: Post[] | undefined;
  post: Post | null;
  currentPostReactions: number | undefined;
  getPostsStatus: TStatus;
  getPostStatus: TStatus;
}
