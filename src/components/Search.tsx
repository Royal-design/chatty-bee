import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { filterData } from "@/redux/slice/filterSlice";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(filterData(searchQuery));
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, dispatch]);

  return (
    <div className="flex gap-2 items-center w-full">
      <div className="relative w-full">
        <Input
          className="px-7 text-light placeholder-red-500 border-border-color"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch className="absolute top-[30%] left-2 text-light" />
      </div>
    </div>
  );
};
