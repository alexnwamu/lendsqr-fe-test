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
        "z-50 shadow-sm flex items-center bg-white  justify-between xl:justify-start  h-[101px] px-4   lg:pl-[30px] py-[35px] "
      }
    >
      <div className="hidden sm:block w-[144px] h-[30px] relative">
        <Image src="/icon.svg" alt="logo" layout="fill" objectFit="contain" />
      </div>
      <div className="sm:hidden relative">
        <Image
          src="/logomobile.svg"
          alt="logo"
          width={24}
          objectFit="contain"
          height={24}
        />
      </div>
      {/* Search bar   */}

      <form
        onSubmit={handleSearch}
        className="  justify-between   flex-row rounded-lg border flex border-opacity-20 items-center xl:ml-[162px] xl:mr-[357px] w-[200px] md:w-[400px] h-[40px] "
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
          className="h-[40px] bg-[#40CDCC] flex px-2 md:px-4 items-center justify-center rounded-r-lg"
        >
          <div className="w-[14px] h-[14px] relative">
            <Image src="/search.svg" alt="search" layout="fill" />
          </div>
        </button>
      </form>

      {/* Link to Docs  not an actual link because it doesnt go anywhere */}
      <p
        style={{ color: variables.primaryColor }}
        className="cursor-pointer underline hidden sm:block md:mr-[47px]"
      >
        Docs
      </p>
      <Image
        height={26}
        width={26}
        src="/notification.png"
        alt="notification"
        className="  md:mr-[30px]"
      />
      <UserAccountNav />
    </div>
  );
};

export default Navbar;
