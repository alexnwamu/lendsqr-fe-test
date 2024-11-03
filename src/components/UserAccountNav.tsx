"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const UserAccountNav = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const { firstName, lastName, email } = JSON.parse(storedUser);
      setUser({ firstName, lastName, email });
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    router.push("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <Avatar>
          <AvatarImage className="h-[48px] w-[60px] " src={"/avatar.png"} />
        </Avatar>
        <div className="hidden md:flex items-center justify-center font-medium text-[#213F7D] ml-2 mr-1">
          <span className="text-[22px]  ">{user?.firstName}</span>{" "}
          {/* Dropdown Svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.39229 12.0516C9.72823 12.425 10.2751 12.4219 10.6079 12.0516L13.4829 8.857C13.8188 8.48434 13.6852 8.182 13.1845 8.182H6.81567C6.31489 8.182 6.18363 8.48746 6.51723 8.857L9.39229 12.0516Z"
              fill="#213F7D"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-[10px] flex items-center justify-center  px-auto">
        <button
          className="text-[#213F7D] text-center font-medium"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
