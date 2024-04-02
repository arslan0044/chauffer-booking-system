"use client";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";
const Navbar = ({ Name }:{Name:String}) => {
  const Links = [
    { name: "home", link: "/" },
    { name: "fleet", link: "/fleets" },
    { name: "SERVICES", link: "/services" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
    { name: "FAQ", link: "/faq" },
    // { name: "Portfolio", link: "/portfolio" },
  ];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-3xl font-Saira font-semibold whitespace-nowrap capitalize md:font-extrabold md:text-5xl text-primary-main dark:bg-gray-900">
            {Name}
          </span>
        </Link>
        <div className="  md:hidden flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <Link
            href={'/contact'}
            className="text-white font-normal bg-primary-main hover:bg-yellow-400 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-base px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Shedule a Call {" "}<ArrowRightAlt />
          </Link>*/}
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {/* <MenuIcon /> */}
          </button>
        </div>
        <div
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-normal border uppercase border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Links.map((link) => (
              <li key={link.name}>
                <Link href={link.link} passHref legacyBehavior>
                  <a
                    className={clsx(
                      "block text-primary-lite  md:py-1 md:dark:text-primary-main hover:text-primary-main font-bold hover:border-b-4 hover:border-yellow-300 px-3 duration-300	",
                      pathname === link.link && "text-primary-main font-extrabold border-b-4 border-yellow-300"
                    )}
                  >
                    {link.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
