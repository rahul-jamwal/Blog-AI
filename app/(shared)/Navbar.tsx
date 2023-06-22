"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCurrentUser, signOutUser } from "../firebase/auth";
import SocialLinks from "./SocialLinks";
import image from "/public/assets/ad-1.jpg";

type Props = {};

const Navbar = (props: Props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((usr) => {
      setUser(usr);
      // console.log(usr);
    });
  }, []);
  

  return (
    <header className="mb-5">
      <nav>
        <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
          <div className="hidden sm:block">
            <SocialLinks />
          </div>
          <div className="flex justify-between items-center gap-10">
            <Link href="/">Home</Link>
            <Link href="/">Trending</Link>
            <Link href="/">About</Link>
          </div>
          {!user ? (<div className="flex">
            <Link
              className="mx-2 py-1"
              href="/signup"
            >
              Sign Up
            </Link>
            <Link
              className="mx-2 py-1"
              href="/signin"
            >
              Sign In
            </Link>
          </div>) : (
            <div>
              <button
            className="border rounded-md mx-2 py-1 cursor-pointer  border-black px-4"
            onClick={async () => {
              await signOutUser();
              window.location.reload();
            }}
          >
            Sign Out
          </button>
            </div>
          )}
        </nav>
        <div className="flex justify-between gap-8 mt-5 mb-4 mx-10">
          <div className="basis-2/3 md: mt-3">
            <h1 className="font-bold text-3xl md:text-5xl">
              BLOG OF THE FUTURE
            </h1>
            <p className="text-sm mt-3">
              Blog dedicated toward AI and generation and job automation.
            </p>
          </div>
          <div className="basis-full relative w-auto h-32 bg-wh-500">
            <Image
              fill
              alt="tech"
              // placeholder="blur"
              src={image}
              sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
