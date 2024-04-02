"use client";
import React from "react";
import Tabal from "../../../../components/Dashboard/services/Table";
import { useGetFleetsQuery } from "@/redux/services/date";
import Link from "next/link";
function DashboardFleetPage() {
  return (
    <>
      <div className=" flex justify-between py-2 ">
        <div> <h3 className=" text-3xl font-bold">Fleet List</h3></div>
        <div>
          <Link className=" bg-primary-main text-primary-dark px-5 py-2 text-2xl rounded-lg hover:bg-blue-900" href={"#"}>
          + New Fleet
          </Link>
          </div>
      </div>
      <Tabal />
    </>
  );
}

export default DashboardFleetPage;
