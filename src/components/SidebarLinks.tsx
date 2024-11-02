// components/MyComponent.tsx

"use client"; // Ensure this component is rendered on the client side

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  customerLinks,
  businessesLinks,
  settingsLinks,
  LinkData,
} from "@/app/data/linkData";

const SidebarLinks: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  const renderLinks = (links: LinkData[]) => {
    return links.map((link, index) => {
      const isActive = pathname === link.url; // Check if the current path matches the link's URL
      const bgColor = isActive
        ? "bg-[#39CDCC] bg-opacity-[0.06]"
        : "bg-transparent"; // Active background with opacity
      const borderColor = isActive ? "border-[#39CDCC]" : "border-transparent"; // Border color

      return (
        <Link
          href={link.url}
          key={index}
          className={`flex pl-[30px] gap-[10px] py-[10px] items-center text-[#545F7D] border-l-[3px] ${borderColor} ${bgColor}`}
        >
          <Image src={link.icon} alt={link.title} width={16} height={16} />
          <span>{link.title}</span>
        </Link>
      );
    });
  };

  return (
    <div className="overflow-y-auto ">
      <h1 className="text-[#545F7D] text-[12px] mt-[41px] ml-[30px] mb-[10px]">
        CUSTOMERS
      </h1>
      {renderLinks(customerLinks)}

      <h1 className="text-[#545F7D] text-[12px] mt-[41px] ml-[30px] mb-[10px]">
        BUSINESSES
      </h1>
      {renderLinks(businessesLinks)}

      <h1 className="text-[#545F7D] text-[12px] mt-[41px] ml-[30px] mb-[10px]">
        SETTINGS
      </h1>
      {renderLinks(settingsLinks)}
    </div>
  );
};

export default SidebarLinks;
