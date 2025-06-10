"use client";
import { GoSearch } from "react-icons/go";

export const Search: React.FC = () => {
  return (
    <div className="border border-neutral-300 relative flex items-center h-10 w-full rounded-md">
      <GoSearch className="text-[20px] text-neutral-500 absolute left-2 pointer-none" />
      <input
        type="text"
        className="h-full w-full px-2 pl-10 outline-none"
        placeholder="Search..."
      />
    </div>
  );
};
