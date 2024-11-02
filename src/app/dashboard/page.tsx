"use client";

import { useEffect, useState } from "react";
import { User } from "../types/User";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserList from "@/components/UserList";
export default function Dashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Typically i wouldnt use fetch in a real project i would use axios or react-query or whateever library is better
        const response = await fetch(
          "https://run.mocky.io/v3/466fff54-53ae-477a-abdb-519511aea358",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setTotalUsers(data.length); // Set the total number of users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-[#FBFBFB] p-[60px] relative z-0 min-h-screen">
      <h1 className="text-[#213F7D] text-[24px]">Users</h1>
      <div className="grid mt-[40px] grid-cols-4 gap-[24px]">
        <div className=" bg-white  userbox pt-[20px] pl-[30px] pb-[30px]">
          {" "}
          <Image src="/totalusers.svg" alt="logo" width={40} height={40} />
          <p className="text-[#545F7D] text-[14px] mt-[14px] mb-[12px] ">
            USERS
          </p>
          <h1 className="text-[#213F7D] text-[24px] font-bold">{totalUsers}</h1>
        </div>

        <div className=" bg-white  userbox pt-[20px] pl-[30px] pb-[30px]">
          {" "}
          <Image src="/activeusers.svg" alt="logo" width={40} height={40} />
          <p className="text-[#545F7D] text-[14px] mt-[14px] mb-[12px] ">
            ACTIVE USERS
          </p>
          <h1 className="text-[#213F7D] text-[24px] font-bold">
            {" "}
            {users.filter((user) => user.status === "active").length}
          </h1>
        </div>
        <div className=" bg-white  userbox pt-[20px] pl-[30px] pb-[30px]">
          {" "}
          <Image src="/userswithloans.svg" alt="logo" width={40} height={40} />
          <p className="text-[#545F7D] mt-[14px] mb-[12px] text-[14px] ">
            USERS WITH LOANS
          </p>
          <h1 className="text-[#213F7D] text-[24px] font-bold">12,453</h1>
        </div>
        <div className=" bg-white  userbox pt-[20px] pl-[30px] pb-[30px]">
          {" "}
          <Image
            src="/userswithsavings.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <p className="text-[#545F7D] text-[14px] mt-[14px] mb-[12px] ">
            USERS WITH SAVINGS
          </p>
          <h1 className="text-[#213F7D] text-[24px] font-bold">102,453</h1>
        </div>
      </div>
      <UserList />
    </div>
  );
}
