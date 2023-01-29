import React, { useState } from "react";

import SearchIcon from "../../assets/icons/SearchIcon";
import { useAppDispatch } from "../../hooks/useRedux";
import { searchPosts } from "../../redux/thunks/postThunk";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!searchText) return;
    dispatch(searchPosts(searchText));
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="h-12 w-full rounded-md border-2 pl-2 pr-14 outline-none focus:border-2 focus:border-blue-500"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div
        className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-md hover:bg-blue-100"
        onClick={handleSearch}
      >
        <div className="h-7 w-7">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
