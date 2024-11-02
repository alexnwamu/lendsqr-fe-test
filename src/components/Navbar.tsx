import React from "react";
import Image from "next/image";
import variables from "../app/variable.module.scss";
import UserAccountNav from "./UserAccountNav";
import { useSearch } from "./SearchContext";
const Navbar = () => {
  const { setSearchTerm } = useSearch();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).searchInput.value;
    setSearchTerm(searchInput);
  };
  return (
    <div
      className={
        "z-50 shadow-sm flex items-center bg-white  h-[101px]  pl-[30px] py-[35px] "
      }
    >
      <div className=" relative w-[144px] h-[30px]">
        <Image
          src="/icon.svg"
          objectFit="contain"
          alt="logo"
          layout="fill"
          className="w-10 h-10"
        />
      </div>
      {/* Search bar   */}
      <form
        onSubmit={handleSearch}
        className="flex  justify-between flex-row rounded-lg border border-opacity-20 order-[#213F7D] items-center ml-[162px] mr-[357px] w-[400px] h-[40px] "
      >
        <input
          type="text"
          name="searchInput"
          id=""
          placeholder="Search for anything"
          className=" text-[14px] outline-none pl-5 px-3 border-none h-4 "
        />
        <button
          type="submit"
          className="h-[40px] w-[56px] bg-[#39CDCC] flex items-center justify-center rounded-r-lg"
        >
          <div className="w-[14px] h-[14px] relative">
            <Image src="/search.svg" alt="search" layout="fill" />
          </div>
        </button>
      </form>

      {/* Link to Docs  not an actual link because it doesnt go anywhere */}
      <p
        style={{ color: variables.primaryColor }}
        className="cursor-pointer underline mr-[47px] j"
      >
        Docs
      </p>
      <Image
        height={26}
        width={26}
        src="/notification.png"
        alt="notification"
        className="mr-[30px]"
      />
      <UserAccountNav />
    </div>
  );
};

export default Navbar;
