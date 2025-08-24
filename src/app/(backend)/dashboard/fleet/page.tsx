"use client";
import React, { useRef, useState } from "react";
import Tabal from "../../../../components/Dashboard/services/Table";
import Dailogbox from "./NewCustomer";
import { ToastContainer } from "react-toastify";

function DashboardFleetPage() {
  const [newFleet, setNewFleet] = useState(false);
  const state = useRef();
  
  const Cansal = (chose: boolean) => {
    if (chose) {
      setNewFleet(false);
    }
  };

  return (
    <div className=" max-w-screen-xl mx-auto">
      <div className=" flex justify-between py-2 px-0.5 mt-5">
        <h3 className=" text-4xl font-bold">Fleet List</h3>
        <button
          className=" bg-primary-main text-primary-dark px-5 py-2 text-xl rounded-lg hover:bg-blue-900"
          onClick={() => setNewFleet(true)}
        >
          + New Fleet
        </button>
      </div>
      <Tabal />
      {newFleet && <Dailogbox onDailog={Cansal} />}
      <ToastContainer />
    </div>
  );
}

export default DashboardFleetPage;
