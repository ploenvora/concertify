import React from "react";
import { FiSearch } from "react-icons/fi"; // Importing the search icon

function Search() {
  return (
    <div className="cursor-pointer border-none rounded-full bg-white inline-flex items-center px-4 py-2 w-[24vw] h-[5vh] min-h-[30px] min-w-[300px]">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder-gray-400 flex-grow"
      />
      <FiSearch className="text-gray-500 text-l ml-2 flex-shrink-0" />
    </div>
  );
}

export default Search;
