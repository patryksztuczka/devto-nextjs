import { Post } from "../../types/Post";

export interface IPostCardProps {
  post: Post;
  lastPost?: (node: any) => void;
}
