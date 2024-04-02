"use client"
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const Footer = ({Name,email}) => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "COMPANY", link: "/company" },
    // { name: "SERVICE", link: "/service" },
    { name: "CONTACT", link: "/contact" },
    { name: "BLOG", link: "/blog" },
    // { name: "Portfolio", link: "/portfolio" },
  ];
  const Contact = [
    { name: "Health Care" },
    { name: "Textile" },
    { name: "E-commerce" },
    { name: "legal & law firm " },
    { name: "Banking & Finance" },
  ];
  const Service = [
    { title: "Web Development" },
    { title: "Digital Marketing" },
    { title: "Graphics Designing" },
    { title: "Cyber Security" },
    { title: "IT Support" },
  ];
  const Social = [
    {
      name: "Facebook",
      icons: <Facebook />,
      link: "https://www.facebook.com/CitiSolution",
    },
    {
      name: "WhatsApp",
      icons: <WhatsApp />,
      link: "https://wa.me/message/3HXX6J43POENF1",
    },
    {
      name: "Instagram",
      icons: <Instagram />,
      link: "https://www.instagram.com/citi_solution/",
    },
    {
      name: "LinkedIn",
      icons: <LinkedIn />,
      link: "https://www.linkedin.com/company/citi-solution",
    },
    {
      name: "Twitter",
      icons: <Twitter />,
      link: "https://twitter.com/citi_solution",
    },
    // { name: "SERVICE", link: "/service" },
    // { name: "Github",icons: <GitHub />, link: "https://twitter.com/citi_solution" },
    // { name: "Pintrest",icons: <Pinterest />, link: "https://twitter.com/citi_solution" },
    {
      name: "Youtube",
      icons: <YouTube />,
      link: "https://www.youtube.com/@CitiSolution",
    },
  ];
  const newDate = new Date();
  let year = newDate.getUTCFullYear();
  return (
    <footer className="bg-white  dark:bg-[#010203]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-3xl font-semibold capitalize whitespace-nowrap font-[nasalization] text-primary-main dark:text-[#fafaf5]">
                {Name}
              </span>
            </Link>
            <div className="hidden lg:grid lg:w-full mx-auto max-w-screen-md text-start">
              <p className=" font-light text-gray-500 sm:text-xl dark:text-gray-400">
                At Citi Solution, we're not just a service provider;
                <br /> we're your trusted partner on the journey to success.
              </p>
              <p className="mt-2 font-base text-gray-500 sm:text-xl dark:text-gray-400">
                Email :{" "}
                <Link
                  href={"mailto:info@citisolution.com"}
                  className="hover:underline  duration-500 hover:text-primary-main"
                >
                  {email}
                </Link>
              </p>
              <p className="mt-2 font-base text-gray-500 sm:text-xl dark:text-gray-400">
                Mobile :{" "}
                <Link
                  href={"tel:+923240044897"}
                  className="hover:underline duration-500 hover:text-primary-main"
                >
                  +923240044897
                </Link>
              </p>
              <p className="mt-2 font-base text-gray-500 sm:text-xl dark:text-gray-400">
                Address :{" "}
                <Link
                  href={"https://g.page/r/CbsSEMHktjZ1EAI/"}
                  target="_blank"
                  className="hover:underline duration-500 hover:text-primary-main"
                >
                  Bata, Jallo More pure, Lahore, Punjab 53400
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#010203] uppercase dark:text-[#fafaf5]">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {Links.map((i) => (
                  <li key={i.name} className="mb-4">
                    <Link
                      href={i.link}
                      className="hover:underline uppercase duration-500 hover:text-[#1565C0]"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#010203] uppercase dark:text-[#fafaf5]">
                Services
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {Service.map((i) => (
                  <li
                  key={i.title}
                  className="mb-4 hover:underline uppercase duration-500 hover:text-[#1565C0] cursor-pointer"
                >
                  {i.title}
                </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#010203] uppercase dark:text-[#fafaf5]">
                Industries
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {Contact.map((i) => (
                  <li
                    key={i.name}
                    className="mb-4 hover:underline uppercase duration-500 hover:text-[#1565C0] cursor-pointer"
                  >
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {year}
            <Link
              href="/"
              className="hover:underline font-bold capitalize text-primary-main font-[nasalization]"
            >
              {" "}
              {Name}
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {Social.map((i,index) => (
              <Link 
              key={index}
                href={i.link}
                target="_blank"
                className="text-gray-500 hover:text-[#010203] dark:hover:text-[#fafaf5]"
              >
                {i.icons}
                <span className="sr-only">{i.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
