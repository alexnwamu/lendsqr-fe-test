"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import variables from "../variable.module.scss";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    //Get stored user details
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const {
        email: storedEmail,
        password: storedPassword,
        token,
      } = JSON.parse(storedUser);

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("authToken", token); // Store token for session management
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password.");
      }
    } else {
      toast.warn("No account found. Please sign up first.");
      router.push("/signup");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  //Function to toggle password visibility ie the show/hide
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="px-4 md:px-[24px] lg:px-[48px] xl:px-[67px]">
      {" "}
      <div className="ml-4 mt-4 md:ml-[24px] md:mt-[24px] lg:ml-[48px] lg:mt-[48px] xl:ml-[96px] mb-[73px] xl:mt-[106px]">
        <Image src="/icon.svg" alt="Logo" width={173} height={36} priority />
      </div>
      <div className="flex">
        <div className="mt-[65px] hidden md:block">
          <Image src="/loginImage.svg" alt="Login" width={600} height={340} />
        </div>
        <form
          onSubmit={handleLogin}
          className="ml-4 md:ml-[48px] lg:ml-[96px] w-[447px] xl:ml-[169px]"
        >
          <h1
            style={{ color: variables.primaryColor }}
            className="xl:text-[40px] text-[24px] lg:text-[32px font-bold font-avenir-bold"
          >
            Welcome!
          </h1>
          <p className="text-[#545F7D] text-[16px] mb-[60px] md:text-[20px] font-avenir">
            Enter details to login.
          </p>
          <input
            type="email"
            className="px-4 pt-[17.5px] mb-6 pb-[12.5px] border-2 border-[#545F7D26]  focus:outline-none  w-full rounded-[5px] text-[#545F7D] font-avenir text-[14px] "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative border-2 border-[#545F7D26]  rounded-[5px] w-full ">
            <input
              className="pl-4 pt-[17.5px] mb-6 pr-[75px] focus:outline-none  rounded-[5px]  w-full text-[#545F7D] font-avenir text-[14px] "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <p
              className="absolute right-4 top-[30px] transform -translate-y-1/2 text-[#39CDCC] cursor-pointer font-avenir"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </p>
          </div>
          <Link
            href="/signup"
            className=" text-[#39CDCC] font-avenir-bold text-[12px]"
          >
            {" "}
            FORGOT PASSWORD ?
          </Link>
          <button
            className="bg-[#39CDCC] mt-[30px]  rounded-lg w-full px-auto py-3.5 text-white font-avenir-bold text-[14px]"
            type="submit"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
