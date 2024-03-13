"use client";
// import SearchCustomer from "@/ui/dataentry/customer/SearchCustomer";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Tabal() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/fleet", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);
  // console.log(data)

  {
    /* <SearchCustomer getSearchResults={(results) => setCendor(results)} /> */
  }
  return (
    <section className="mt-8 max-w-screen-xl mx-auto ">
      <div className="flex items-center w-full ">
        <div className="overflow-x-auto">
          <table className="mini-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Model</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">type</th>
                <th className="py-3 px-4 text-left">Img</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>

            {data.map((item) => (
              <tbody className="text-blue-gray-900" key={item._id}>
                <tr className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">{item.model}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">{item.type}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.img}
                      alt={item.model}
                      className="w-48 h-48"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/dashboard/fleet/${item._id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
