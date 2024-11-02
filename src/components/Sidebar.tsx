import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    router.push("/login");
  };
  return (
    <div className="shadow-right mt-[39px]  bg-white w-[283px]  h-[150%] overflow-y-auto   ">
      <div className="flex ml-[30px] mb-[52px] gap-[10px] items-center text-[#213F7D]">
        <Image src="/organization.svg" alt="logo" width={16} height={16} />
        <span>Switch Organization</span>
        <ChevronDown className="w-[14px] h-[14px]" />
      </div>
      <div className="flex ml-[30px] gap-[10px] items-center text-[#213F7D]">
        <Image src="/home.svg" alt="logo" width={16} height={16} />
        <span className="opacity-80">Dashboard</span>
      </div>
      {/* Customers link */}
      <SidebarLinks />
      <div className="mt-[71px] mb-[20px] bg-[#213F7D] bg-opacity-10 h-[1px] w-full" />
      <button
        onClick={handleLogout}
        className="flex ml-[30px] gap-[10px] items-center text-[#213F7D]"
      >
        <Image src="/sign-out.svg" alt="logo" width={16} height={16} />
        <span>Logout</span>
      </button>
      <p className="text-[#213F7D] ml-[30px] text-[12px] mt-[20px]">v1.2.0</p>
    </div>
  );
};

export default Sidebar;
