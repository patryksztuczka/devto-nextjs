import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./useRedux";
import { getPosts } from "../redux/thunks/postThunk";

export const usePostsSearch = () => {
  const dispatch = useAppDispatch();

  const pageNumber = useAppSelector((state) => state.post.page);
  const skip = pageNumber * 10;

  useEffect(() => {
    dispatch(getPosts(skip));
  }, [dispatch, skip]);
};
