import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/app/types/User";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useSearch } from "./SearchContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FilterForm from "./FilterForm";
import Image from "next/image";
import Link from "next/link";
const UserList: React.FC = () => {
  const { searchTerm } = useSearch();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Default number of users per page
  const [offset, setOffset] = useState(0); // The starting index for the current page
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const convertDateFormat = (dateString: string): string => {
    const dateObject = new Date(dateString);
    return format(dateObject, "MMMM dd, yyyy hh:mm a");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/466fff54-53ae-477a-abdb-519511aea358",
        );
        setUsers(response.data); // Set users from API response
      } catch (err) {
        console.log(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  //Function for handling search

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const results = users.filter((user) => {
        return (
          user.organizationName.toLowerCase().includes(lowerCaseTerm) || // Partial match
          user.organizationName.toLowerCase() === lowerCaseTerm || // Exact match
          user.username.toLowerCase().includes(lowerCaseTerm) || // Partial match
          user.email.toLowerCase().includes(lowerCaseTerm) || // Partial match
          user.phone.includes(lowerCaseTerm) || // Partial match
          user.status.toLowerCase().includes(lowerCaseTerm) || // Partial match
          user.username.toLowerCase() === lowerCaseTerm || // Exact match
          user.email.toLowerCase() === lowerCaseTerm || // Exact match
          user.phone === lowerCaseTerm || // Exact match
          user.status.toLowerCase() === lowerCaseTerm // Exact match
        );
      });
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setOffset(0); // Reset to the first page when the limit changes
  };

  const handleNextPage = () => {
    setOffset((prev) => Math.min(prev + limit, users.length - 1));
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  // Slice the users array to get only the users for the current page
  const currentUsers = filteredUsers.slice(offset, offset + limit);

  // Calculate total pages based on the total number of users and the current limit
  const totalPages = Math.ceil(filteredUsers.length / limit);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const currentPage = Math.floor(offset / limit) + 1; // Calculate the current page (1-based)

    for (let i = 1; i <= totalPages; i++) {
      // Always show the first and last pages, and the pages around the current page
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setOffset((i - 1) * limit)} // Set offset based on page number
            className={`mx-1 px-3 py-1 rounded ${
              (i - 1) * limit === offset
                ? "text-[#545F7D]"
                : "text-opacity-60 text-[#545F7D]"
            }`}
          >
            {i}
          </button>,
        );
      } else if (i === currentPage + 2 && i < totalPages) {
        pageNumbers.push(
          <span key="ellipsis" className="mx-1">
            ...
          </span>,
        );
      }
    }

    return pageNumbers;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pt-[40px]">
      <div className=" ">
        <div className="px-[30px] userbox text-[#545F7D]  pt-[20px] bg-white">
          {/* Table Header */}
          <div className="flex  text-[12px]  font-semibold">
            <div className="flex-1 px-4 py-2 inline-flex items-center ">
              ORGANIZATION{" "}
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
            <div className="flex-1 px-4 py-2 inline-flex items-center">
              USERNAME
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
            <div className="flex-1 px-4 py-2 inline-flex items-center">
              EMAIL
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
            <div className="flex-1 px-4 py-2 inline-flex items-center">
              PHONE NUMBER
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
            <div className="flex-1 px-4 py-2 inline-flex items-center">
              DATE JOINED
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
            <div className="flex-1 px-4 py-2 inline-flex items-center">
              STATUS
              <FilterForm users={users} onFilter={setFilteredUsers} />
            </div>
          </div>

          {/* Table Body */}
          {currentUsers.map((user, index) => (
            <div
              key={index}
              className="flex border-b border-b-[#213F7D1A] text-[14px] py-[21px]"
            >
              <div className="flex-1 px-4  py-2">{user.organizationName}</div>
              <div className="flex-1 ml-2  px-4  py-2">{user.username}</div>
              <div className="flex-1  px-4 py-2">{user.email}</div>
              <div className="flex-1 ml-2  px-4 py-2">{user.phone}</div>
              <div className="flex-1  px-4 py-2">
                {convertDateFormat(user.dateJoined)}
              </div>
              <div className="flex-1  px-4 py-2">
                <p
                  className={`px-3 py-[6px] capitalize inline rounded-[100px] ${
                    user.status === "inactive"
                      ? "text-[#545F7D] bg-[#545F7D] bg-opacity-10"
                      : user.status === "pending"
                        ? "text-[#E9B200] bg-[#E9B200] bg-opacity-10"
                        : user.status === "blacklisted"
                          ? "text-[#E4033B] bg-[#E4033B] bg-opacity-10"
                          : user.status === "active"
                            ? "text-[#39CD62] bg-[#39CD62] bg-opacity-10"
                            : "text-gray-500 bg-gray-200" // Fallback style
                  }`}
                >
                  {user.status}
                </p>
              </div>
              <div className="">
                <Popover>
                  <PopoverTrigger>
                    <Image
                      src="/viewdetails.svg"
                      alt="view details"
                      width={20}
                      height={20}
                    />
                  </PopoverTrigger>
                  <PopoverContent className=" pl-[20px] text-[#545F7D] flex flex-col gap-5  pt-[20px] w-[180px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/eye.svg"
                        alt="view details"
                        width={20}
                        height={20}
                      />
                      <Link href={`dashboard/${user.id}`} className=" text-sm">
                        View Details
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/blacklist.png"
                        alt="view details"
                        width={20}
                        height={20}
                      />
                      <Link href={`#`} className=" text-sm">
                        Blacklist User
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/activate.png"
                        alt="view details"
                        width={20}
                        height={20}
                      />
                      <Link href={`#`} className=" text-sm">
                        Activate User
                      </Link>
                    </div>{" "}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
        {/*Pagination Component*/}
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-row items-center text-[14px] text-[#545F7D]">
            <p className="mr-2">Showing</p>
            <div className="relative">
              <select
                className="text-[#213F7D] bg-[#213F7D1A] appearance-none py-2 pl-4 pr-8 rounded-[4px]"
                id="limit"
                value={limit}
                onChange={handleLimitChange}
              >
                {[5, 10, 20, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform   -translate-y-1/2 pointer-events-none">
                {/* Custom dropdown icon, e.g., an arrow icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g opacity="0.6">
                    <path
                      d="M11.0573 3.99378C11.8984 3.15269 13.1595 4.45644 12.3184 5.25487L7.56759 10.0056C7.23127 10.3841 6.64282 10.3841 6.3065 10.0056L1.64002 5.38129C0.841037 4.5402 2.10267 3.27906 2.94322 4.1202L6.937 8.11398L11.0573 3.99378Z"
                      fill="#213F7D"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <p className="ml-2">out of {filteredUsers.length}</p>
          </div>
          <div className="flex flex-row gap-[20px]">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0}
              className={`${offset === 0 ? "text-opacity-60 cursor-not-allowed" : "text-opacity-100"} bg-[#213F7D1A] text-[#213F7D] rounded p-[5px]`}
            >
              <ChevronLeft className="w-[24px] h-[24px]" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center">{renderPageNumbers()}</div>

            <button
              onClick={handleNextPage}
              disabled={offset >= filteredUsers.length - limit}
              className={`${offset >= filteredUsers.length - limit ? "text-opacity-60 cursor-not-allowed" : "text-opacity-100"} bg-[#213F7D1A] text-[#213F7D] rounded p-[5px]`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
