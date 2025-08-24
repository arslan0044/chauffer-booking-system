"use client";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Dailogbox from "@/components/Dailogbox";
import React, { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Eye } from "lucide-react";
import { getFleets, deleteFleet } from "@/lib/actions";

export default function Table() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const idProductRef = useRef();
  const modalRef = useRef();
  const [dailog, setDailog] = useState({
    massage: "",
    isLoading: false,
  });

  useEffect(() => {
    async function fetchFleets() {
      try {
        setIsLoading(true);
        const fleetsData = await getFleets();
        console.log(fleetsData);
        setData(fleetsData);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFleets();
  }, []);

  const handleDelete = (_id: any, name: any) => {
    setDailog({
      massage: `Do you want to delete ${name} this vehicle?`,
      isLoading: true,
    });
    idProductRef.current = _id;
    modalRef.current = name;
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteFleet(idProductRef.current || "");

      if (result.success) {
        toast.success("Fleet deleted successfully");
        // Refresh data
        const fleetsData = await getFleets();
        setData(fleetsData);
      } else {
        toast.error("Failed to delete fleet");
      }
    } catch (error) {
      toast.error("Error deleting fleet");
    }
    setDailog({ massage: "", isLoading: false });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading fleets</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Price/Hour
            </th>
            <th scope="col" className="px-6 py-3">
              Capacity
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((fleet: any) => (
            <tr
              key={fleet._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {fleet.make} {fleet.model}
                </div>
                <div className="text-sm text-gray-500">
                  {fleet.year} • {fleet.licensePlate}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    fleet.category === "VIP"
                      ? "bg-purple-100 text-purple-800"
                      : fleet.category === "Luxury"
                      ? "bg-yellow-100 text-yellow-800"
                      : fleet.category === "Elite"
                      ? "bg-blue-100 text-blue-800"
                      : fleet.category === "Business"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {fleet.category}
                </span>
              </td>
              <td className="px-6 py-4">{fleet.vehicleType}</td>
              <td className="px-6 py-4">
                <div className="font-medium">${fleet.basePricePerHour}</div>
                <div className="text-sm text-gray-500">
                  ${fleet.pricePerKm}/km
                </div>
              </td>
              <td className="px-6 py-4">
                <div>{fleet.seats} seats</div>
                <div className="text-sm text-gray-500">
                  {fleet.luggageCapacity} bags
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    fleet.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fleet.available ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Link href={`/fleets/${fleet._id}`} target="_blank">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye size={16} />
                    </button>
                  </Link>
                  <button className="text-green-600 hover:text-green-900">
                     <Link href={`/dashboard/fleet/${fleet._id}`}>
                      <Edit size={16} />
                    </Link>
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(fleet._id, `${fleet.make} ${fleet.model}`)
                    }
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {dailog.isLoading && (
        <Dailogbox massage={dailog.massage} onDailog={confirmDelete} />
      )}
    </div>
  );
}
