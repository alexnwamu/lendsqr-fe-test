import React, { useState } from "react";

import { User } from "@/app/types/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface FilterProps {
  users: User[];
  onFilter: (filteredUsers: User[]) => void; // Callback to pass filtered users back
}
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const FilterForm: React.FC<FilterProps> = ({ users, onFilter }) => {
  const [organization, setOrganization] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [dateJoined, setDateJoined] = useState<Date | null>(new Date());

  const organizations = [
    "Tech Innovations",
    "Health Solutions",
    "Finance Group",
    "Creative Agency",
    "Construction Corp",
    "Retail Solutions",
    "E-commerce Inc.",
    "Travel Agency",
    "Food Services",
    "Logistics Co.",
  ];

  const handleFilter = () => {
    const filtered = users.filter((user) => {
      const userDateJoined = new Date(user.dateJoined).toLocaleDateString();

      return (
        (organization ? user.organizationName === organization : true) &&
        (username
          ? user.username.toLowerCase().includes(username.toLowerCase())
          : true) &&
        (email
          ? user.email.toLowerCase().includes(email.toLowerCase())
          : true) &&
        (status ? user.status.toLowerCase() === status.toLowerCase() : true) &&
        (dateJoined ? userDateJoined === dateJoined.toLocaleDateString() : true) // Compare strings
      );
    });
    onFilter(filtered); // Pass filtered users back to parent
  };

  const handleReset = () => {
    setOrganization("");
    setUsername("");
    setEmail("");
    setStatus("");
    setDateJoined(null);
    onFilter(users); // Reset to all users
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Image
          src="/filter.svg"
          width={16}
          height={16}
          alt="Filter "
          className="ml-2.5"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className=" flex flex-col text-[#545F7D] text-[14px] py-[30px] w-[270px] px-[20px] bg-white rounded">
          <h1 className="text-[14px] font-medium mb-[6px]">Organization</h1>
          <div className="relative">
            <select
              value={organization}
              className="opacity-60 border-[#213F7] appearance-none border border-opacity-20 rounded-[8px] pl-[20px] w-full py-3 "
              onChange={(e) => setOrganization(e.target.value)}
            >
              <option value="">Select </option>
              {organizations.map((org, index) => (
                <option key={index} value={org}>
                  {org}
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
          <h1 className="text-[14px] font-medium mt-[20px] mb-[6px]">
            Username
          </h1>
          <input
            type="text"
            className="opacity-60 border-[#213F7] border border-opacity-20 rounded-[8px] pl-[20px] py-3 "
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h1 className="text-[14px] font-medium mt-[20px] mb-[6px]">Email</h1>
          <input
            type="text"
            className="opacity-60 border-[#213F7] border border-opacity-20 rounded-[8px] pl-[20px] py-3 "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h1 className="text-[14px] font-medium mt-[20px] mb-[6px]">Date</h1>
          <div className="relative">
            <DatePicker
              onChange={(date: Date | null) => setDateJoined(date)}
              placeholderText="Date"
              selected={dateJoined}
              customInput={
                <input
                  type="text"
                  placeholder="Date"
                  className="opacity-60 border-[#213F7] w-[230px] border border-opacity-20 rounded-[8px] pl-[20px] py-3 "
                  readOnly
                />
              }
            />
            <div className="absolute right-3 top-1/2 transform cursor-pointer  -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_5530_2554)">
                  <path
                    d="M14.9919 2.16002H12.7037V0.768152C12.7037 0.560024 12.5437 0.400024 12.3356 0.400024H10.6562C10.4481 0.400024 10.2881 0.560024 10.2881 0.768152V2.16002H5.7118V0.768152C5.7118 0.560024 5.5518 0.400024 5.34367 0.400024H3.66367C3.45554 0.400024 3.29554 0.560024 3.29554 0.768152V2.16002H1.00802C0.816149 2.16002 0.639893 2.32002 0.639893 2.52815V15.2482C0.639893 15.4563 0.799893 15.6163 1.00802 15.6163H14.9917C15.1836 15.6163 15.3598 15.4563 15.3598 15.2482V2.52815C15.3598 2.32002 15.1836 2.16002 14.9917 2.16002H14.9919ZM11.0082 1.13628H11.9682V3.24812H11.0082V1.13628ZM4.01637 1.13628H4.97637V3.24812H4.01637V1.13628ZM14.6239 14.8638H1.37637V5.5038H14.6245L14.6239 14.8638Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M3.19994 13.2164H4.91178C5.00803 13.2164 5.08803 13.1364 5.08803 13.0401V11.3119C5.08803 11.2157 5.00803 11.1357 4.91178 11.1357L3.19994 11.1363C3.10369 11.1363 3.02368 11.2163 3.02368 11.3126V13.0244C3.02368 13.1363 3.10368 13.2163 3.19994 13.2163V13.2164Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M7.13635 13.2164H8.84819C8.94444 13.2164 9.02444 13.1364 9.02444 13.0401L9.02382 11.3119C9.02382 11.2157 8.94382 11.1357 8.84756 11.1357L7.13636 11.1363C7.04011 11.1363 6.96011 11.2163 6.96011 11.3126V13.0244C6.94386 13.1363 7.02386 13.2163 7.13636 13.2163L7.13635 13.2164Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M11.0565 13.2164H12.7684C12.8646 13.2164 12.9446 13.1364 12.9446 13.0401L12.944 11.3119C12.944 11.2157 12.864 11.1357 12.7677 11.1357L11.0565 11.1363C10.9603 11.1363 10.8803 11.2163 10.8803 11.3126V13.0244C10.864 13.1363 10.944 13.2163 11.0565 13.2163L11.0565 13.2164Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M3.19994 9.26372H4.91178C5.00803 9.26372 5.08803 9.18372 5.08803 9.08746V7.37627C5.08803 7.28002 5.00803 7.20001 4.91178 7.20001H3.19994C3.10369 7.20001 3.02368 7.28001 3.02368 7.37627V9.0881C3.02368 9.18373 3.10368 9.26374 3.19994 9.26374V9.26372Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M7.13635 9.26372H8.84819C8.94444 9.26372 9.02444 9.18372 9.02444 9.08746L9.02382 7.37627C9.02382 7.28002 8.94382 7.20001 8.84756 7.20001H7.13636C7.04011 7.20001 6.96011 7.28001 6.96011 7.37627V9.0881C6.94386 9.18373 7.02386 9.26374 7.13636 9.26374L7.13635 9.26372Z"
                    fill="#545F7D"
                  />
                  <path
                    d="M11.0565 9.26372H12.7684C12.8646 9.26372 12.9446 9.18372 12.9446 9.08746L12.944 7.37627C12.944 7.28002 12.864 7.20001 12.7677 7.20001H11.0565C10.9603 7.20001 10.8803 7.28001 10.8803 7.37627V9.0881C10.864 9.18373 10.944 9.26374 11.0565 9.26374L11.0565 9.26372Z"
                    fill="#545F7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5530_2554">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="text-[14px] font-medium mt-[20px] mb-[6px]">Status</h1>
          <div className="relative">
            <select
              value={status}
              className="opacity-60 appearance-none border-[#213F7] w-full border border-opacity-20 rounded-[8px] pl-[20px] py-3 "
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
            <div className="absolute right-3 top-1/2 transform   -translate-y-1/2 pointer-events-none">
              {/* Custom dropdown icon */}
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
          <div className="flex gap-[14px] mt-[30px]">
            <button
              className="border-[#545F7D] border text-[#545F7D] text-sm w-[98px] h-[40px] rounded-[8px] "
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-[#39CDCC] text-white text-sm w-[98px] h-[40px] rounded-[8px]"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterForm;
