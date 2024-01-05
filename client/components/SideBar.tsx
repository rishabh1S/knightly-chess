"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoHome,
  IoPeople,
  IoSettingsOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import { useDisclosure } from "@nextui-org/react";
import { SettingsModal } from ".";
import Image from "next/image";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [iconWidth, setIconWidth] = useState<number>(20);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setIconWidth(30);
      } else if (screenWidth < 960) {
        setIconWidth(32);
      } else {
        setIconWidth(20);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-36 h-screen transition-transform -translate-x-[72%] md:-translate-x-1/2 lg:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-slate-950">
          <Link
            href="/"
            className="flex items-center justify-end lg:justify-center px-1 sm:px-5 mb-5"
          >
            <Image
              src="/images/horse.png"
              alt="Knightly Logo"
              width={28}
              height={28}
            />
            <span className="self-center text-xl font-bold hidden lg:block">
              Knightly
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center justify-end lg:justify-center sm:px-5 py-4 sm:py-2 text-white hover:bg-slate-900 group"
              >
                <IoHome size={iconWidth} className="m-1 sm:m-0" />
                <span className="ms-3 hidden lg:block">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.chess.com/today"
                target="_blank"
                className="flex items-center justify-end lg:justify-center sm:px-5 py-4 sm:py-2 text-white hover:bg-slate-900 group"
              >
                <IoNewspaperOutline size={iconWidth} className="m-1 sm:m-0" />
                <span className="ms-3 hidden lg:block">News</span>
              </Link>
            </li>
            <li>
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  onOpen();
                }}
                className="flex items-center justify-end lg:justify-center sm:px-5 py-4 sm:py-2 text-white hover:bg-slate-900 group"
              >
                <IoSettingsOutline size={iconWidth} className="m-1 sm:m-0" />
                <span className="ms-3 hidden lg:block">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SideBar;
