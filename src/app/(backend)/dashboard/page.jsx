"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("/api/users/me", {
        method: "GET",
      });
      const userData = await response.json();
      setUserData(userData.data);
    };

    getUserData();
  }, []);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="py-20">
      <div className=" grid gap-4 grid-cols-4 max-w-screen-xl">
        <div className="bg-red-500 h-36 w-36 rounded-3xl items-center justify-center flex hover:bg-red-600">
          1
        </div>
        <div className="bg-blue-500 h-36 w-36 rounded-3xl items-center justify-center flex hover:bg-blue-600">
          2
        </div>
        <div className="bg-green-500 h-36 w-36 rounded-3xl items-center justify-center flex hover:bg-green-600">
          3
        </div>
        <div className="bg-yellow-500 h-36 w-36 rounded-3xl items-center justify-center flex hover:bg-yellow-600">
          4
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center min-h-screen py-2">
        <ToastContainer />
        <Link href={`/dashboard/${userData.username}`} className=" text-4xl ">
          {" "}
          {userData.username}
        </Link>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <Link href="/dashboard/fleet">Fleet</Link>
      </div>
    </section>
  );
}

export default Dashboard;
