import Spinner from "@/components/Spinner";
import { useGetFleetsQuery } from "@/redux/services/date";
import Link from "next/link";
// import Image from "next/image";
import Dailogbox from "@/components/Dailogbox";
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
export default function Table() {
  const { data, isLoading, isFetching, error } = useGetFleetsQuery();
  const idProductRef = useRef();
  const modalRef = useRef();
  const [dailog, setDailog] = useState({
    massage: "",
    isLoading: false,
  });
  const handleDelete = (_id: any, name: any) => {
    setDailog({
      massage: `do you want to delete ${name} this car?`,
      isLoading: true,
    });
    idProductRef.current = _id;
    modalRef.current = name;
  };

  const Delete = async (choose: boolean) => {
    if (choose) {
      try {
        await axios.delete(`/api/fleet/${idProductRef.current}`);
        useRouter().reload()
        toast.success(`${modalRef.current} is successfully deleted`);
      } catch (error: any) {
        toast.error(error);
      }
      setDailog({
        massage: ``,
        isLoading: false,
      });
    } else {
      setDailog({
        massage: ``,
        isLoading: false,
      });
    }
  };

  if (error) {
    return <div className="flex justify-center my-8">console.error();</div>;
  }

  if (isLoading || isFetching) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <section className="mt-8 max-w-screen-xl mx-auto ">
       <ToastContainer />
      <div className="flex items-center w-full ">
        <div className="overflow-x-auto">
          <table className="mini-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                {/* <th className="py-3 px-4 text-left">Img</th> */}
                <th className="py-3 px-4 text-left">Model</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">type</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>

            {data.map((item: any) => (
              <tbody className="text-blue-gray-900" key={item._id || "Loading"}>
                <tr className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">
                    <img
                      src={item.img || "Loading"}
                      alt={item.model || "Loading"}
                      className="w-fit h-16"
                    />
                  </td>
                  <td className="py-3 px-4">{item.model || "Loading"}</td>
                  <td className="py-3 px-4">{item.price || "Loading"}</td>
                  <td className="py-3 px-4">{item.type || "Loading"}</td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/dashboard/fleet/${item._id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id, item.model)}
                      // href={`/dashboard/fleet/${item._id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody></tbody>
          </table>
        </div>
      </div>
      {dailog.isLoading && (
        <Dailogbox onDailog={Delete} massage={dailog.massage} />
      )}
    </section>
  );
}
