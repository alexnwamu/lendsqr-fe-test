"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem("authToken");

    // If token exists, redirect to the dashboard
    if (storedToken) {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-[#213F7D]">
        Welcome to Lendsqr
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center">
        Please log in or sign up to continue.
      </p>

      <div>
        <Link href="/login">
          <button className="mr-4 bg-[#39CDCC] text-white hover:bg-[#2ea9a8] transition-all rounded-md py-2 px-4">
            Login
          </button>
        </Link>
        <Link href="/signup ">
          <button className="border-[#39CDCC] hover:border-[#2ea9a8] transition-all border-2 rounded-md py-2 px-4">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
