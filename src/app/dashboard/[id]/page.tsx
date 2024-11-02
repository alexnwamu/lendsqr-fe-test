/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { User } from "@/app/types/User"; // Import the User type
import Link from "next/link";
import Image from "next/image";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams(); // Get the id as a string
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/466fff54-53ae-477a-abdb-519511aea358",
        ); // Replace with your mock API URL
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  // Find user with the matching ID after fetching users
  useEffect(() => {
    if (users.length > 0 && id) {
      const foundUser = users.find((user) => user.id === id); // Compare id as a string
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User not found");
      }
    }
  }, [users, id]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="bg-[#FBFBFB] pt-[65px] px-[60px]  font-work-sans  ">
      <Link href={"/dashboard"} className="flex items-center mb-8 gap-3">
        <Image src="/back.svg" alt="Back" width={30} height={30} />
        <span className="text-[#545F7D]">Back to Users</span>
      </Link>
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-2xl font-bold text-[#213F7D]">User Details</h1>
        <div className="flex gap-5">
          <button className="w-[170px] text-sm text-[#E4033B] border-[#E4033B] border h-[40px] rounded-md">
            {" "}
            BLACKLIST USER
          </button>
          <button className="w-[170px] text-[#39CDCC] text-sm border-[#39CDCC] border h-[40px] rounded-md ">
            ACTIVATE USER
          </button>
        </div>
      </div>
      <div className="bg-white userbox pt-[30px] px-[30px] w-full">
        <div className=" flex flex-row">
          <Image
            src="/userdetailsicon.svg"
            alt="User"
            width={100}
            height={100}
          />
          <div className="ml-5 border-r border-[#545F7D] border-opacity-20 pt-[25px] pr-[30px] ">
            <h1 className="font-medium text-[22px] text-[#213F7D] capitalize">
              {user.userDetails.fullName}
            </h1>
            <p className="text-[#545F7D] text-sm">LSQFf587g{user.id}</p>
          </div>
          <div className="ml-[30px] pt-[29px] border-r border-[#545F7D] border-opacity-20 pr-[30px] ">
            <h1 className="text-sm mb-2.5 text-[#545F7D] font-medium">
              User's Tier
            </h1>
            <Image src="/stars.svg" alt="Stars" width={56} height={16} />
          </div>
          <div className="ml-[30px] pt-[25px] pr-[30px] ">
            <h1 className="font-medium text-[22px] text-[#213F7D] capitalize">
              ₦200,000.00
            </h1>
            <p className="text-[#545F7D] text-sm">
              991234567{user.id}/Providus Bank
            </p>
          </div>
        </div>

        <div className="flex gap-[80px] pt-[51px]">
          <div className="text-[#39CDCC] pb-[10px] border-b-2 border-[#39CDCC] w-[170px] text-center">
            General Details
          </div>

          <div>Documents</div>
          <div>Bank Details</div>
          <div>Loans</div>
          <div>Savings</div>
          <div>App and System</div>
        </div>
      </div>

      <div className="bg-white userbox pb-[46px] pt-[30px] px-[30px] mt-[30px] w-full">
        <h1 className="text-[#213F7D] mb-[30px] text-[16x] font-medium">
          Personal Information
        </h1>
        <table className="w-full text-[#545F7D] ">
          <tr className="text-[#545F7D]  text-[12px]">
            <td>FULL NAME</td>
            <td> PHONE NUMBER</td>
            <td> EMAIL ADDRESS</td>
            <td>BVN</td>
            <td> GENDER</td>
          </tr>
          <tr className="font-medium">
            <td>{user.userDetails.fullName}</td>
            <td>{user.userDetails.phoneNumber}</td>
            <td>{user.userDetails.emailAddress}</td>
            <td>{user.userDetails.bvn}</td>
            <td>{user.userDetails.gender}</td>
          </tr>

          <tr className="text-[#545F7D]  text-[12px]">
            <td className="pt-[30px]">MARITAL STATUS</td>
            <td className="pt-[30px]">CHILDREN</td>
            <td className="pt-[30px]"> TYPE OF RESIDENCE</td>
          </tr>
          <tr className="font-medium">
            <td>Single</td>
            <td>None</td>
            <td>Parents house</td>
          </tr>
        </table>

        <div className="mt-[30px] bg-[#213F7D] bg-opacity-10 h-[1px] w-full" />

        <h1 className="text-[#213F7D] mb-[30px] mt-[30px] text-[16x] font-medium">
          Education and Employment
        </h1>
        <table className="w-full text-[#545F7D] ">
          <tr className="text-[#545F7D]  text-[12px]">
            <td>LEVEL OF EDUCATION</td>
            <td>EMPLOYMENT STATUS</td>
            <td>SECTOR OF EMPLOYMENT</td>
            <td>DURATION OF EMPLOYMENT</td>
          </tr>
          <tr className="font-medium">
            <td>{user.educationAndEmployment.levelOfEducation}</td>
            <td>{user.educationAndEmployment.employmentStatus}</td>
            <td>{user.educationAndEmployment.sectorOfEmployment}</td>
            <td>{user.educationAndEmployment.durationOfEmployment}</td>
          </tr>

          <tr className="text-[#545F7D]  text-[12px]">
            <td className="pt-[30px]">OFFICE EMAIL</td>
            <td className="pt-[30px]">MONTHLY INCOME</td>
            <td className="pt-[30px]">LOAN REPAYMENT</td>
          </tr>
          <tr className="font-medium">
            <td>{user.educationAndEmployment.officeEmail}</td>
            <td>{user.educationAndEmployment.monthlyIncome}</td>
            <td>{user.educationAndEmployment.monthlyIncome}</td>
          </tr>
        </table>
        <div className="mt-[30px] mb-[30px] bg-[#213F7D] bg-opacity-10 h-[1px] w-full" />
        <h1 className="text-[#213F7D] mb-[30px] mt-[30px] text-[16x] font-medium">
          Socials
        </h1>
        <table className="w-full text-[#545F7D] ">
          <tr className="text-[#545F7D]  text-[12px]">
            <td>TWITTER</td>
            <td>FACEBOOK</td>
            <td>INSTAGRAM</td>
          </tr>
          <tr className="font-medium">
            <td>{user.socials.twitter}</td>
            <td>{user.socials.facebook}</td>
            <td>{user.socials.instagram}</td>
          </tr>
        </table>

        <div className="mt-[30px] mb-[30px] bg-[#213F7D] bg-opacity-10 h-[1px] w-full" />

        <h1 className="text-[#213F7D] mb-[30px] mt-[30px] text-[16x] font-medium">
          Guarantor
        </h1>
        <table className="w-full text-[#545F7D] ">
          <tr className="text-[#545F7D]  text-[12px]">
            <td>FULL NAME</td>
            <td>PHONE NUMBER</td>
            <td>EMAIL ADDRESS</td>
            <td>RELATIONSHIP</td>
          </tr>
          <tr className="font-medium">
            <td>{user.guarantor.fullName}</td>
            <td>{user.guarantor.phoneNumber}</td>
            <td>{user.guarantor.emailAddress}</td>
            <td>{user.guarantor.relationship}</td>
          </tr>
        </table>

        <div className="mt-[30px] mb-[79px] bg-[#213F7D] bg-opacity-10 h-[1px] w-full" />
        <table className="w-full text-[#545F7D]  ">
          <tr className="text-[#545F7D]  text-[12px]">
            <td>FULL NAME</td>
            <td>PHONE NUMBER</td>
            <td>EMAIL ADDRESS</td>
            <td>RELATIONSHIP</td>
          </tr>
          <tr className="font-medium">
            <td>{user.guarantor.fullName}</td>
            <td>{user.guarantor.phoneNumber}</td>
            <td>{user.guarantor.emailAddress}</td>
            <td>{user.guarantor.relationship}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default UserDetailsPage;
