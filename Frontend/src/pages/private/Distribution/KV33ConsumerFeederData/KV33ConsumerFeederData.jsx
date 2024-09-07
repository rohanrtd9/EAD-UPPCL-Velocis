import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { apiUrl } from "../../../../utils/constant";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../utils/userContext";
import Loader from "../../../../component/Loader";
import "./../../../../component/pagination.css";
import { IoAddCircleSharp } from "react-icons/io5";

function KV33ConsumerFeederData() {
  const [feeders, setFeeders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();
  const navigate = useNavigate();

  const list33KV = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}distribution/list-33KVIndependent-feeder`,
        {
          page,
          limit: itemsPerPage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { docs, totalPages } = response.data.result;
      setFeeders(docs);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch feeder data.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch feeder data!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    list33KV(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setLoading(true);
        await axios.delete(`${apiUrl}distribution/delete-33KV-feeder`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The feeder has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        await list33KV(currentPage);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleStatusToggle = async (feeder) => {
    const updatedStatus = feeder.status === "Active" ? "Inactive" : "Active";
    try {
      setLoading(true);
      await axios.post(
        `${apiUrl}distribution/update-33KV-feeder-status`,
        { id: feeder._id, status: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeeders((prev) =>
        prev.map((item) =>
          item._id === feeder._id ? { ...item, status: updatedStatus } : item
        )
      );
      setLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update status.",
        icon: "error",
        confirmButtonText: "Ok",
        connfirmButtonColor: "#3085d6",
      });
    }
  };

  const handleEdit = (data) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    navigate(`/outgoingFeeder33KVAction/${encodedData}`);
  };

  const pagesToShow = 4; // Number of page buttons to show
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="33KV & Above Consumer Feeder Master"
        action={{
          button: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <IoAddCircleSharp
                style={{
                  fontSize: "18px",
                  color: "#DCDCDC",
                  marginRight: "8px",
                }}
              />
              Add 33 KV Consumer
            </div>
          ),
          path: "/outgoingFeeder33KVAction/AddKV33ConsumerFeederData",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Division</Th>
            <Th>33KV & Above Consumer Feeders</Th>
            <Th>Feeder Code</Th>
            <Th>Category</Th>
            <Th>Feeder Voltage</Th>
            <Th>Action</Th>
            <Th>Status</Th>
            <Th>Active/Inactive</Th>
          </Tr>
        </Thead>
        <Tbody>
          {feeders.map((feeder, index) => (
            <Tr key={feeder._id}>
              <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
              <Td>{feeder.divisionName}</Td>
              <Td>{feeder.consumerName}</Td>
              <Td>{feeder.feederCode}</Td>
              <Td>{feeder.feederCategory}</Td>
              <Td>{feeder.feederVoltage}</Td>
              <Td flex={true}>
                <button
                  onClick={() => handleDelete(feeder._id)}
                  className="text-red-600 hover:text-red-800 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleEdit(feeder)}
                  className="text-indigo-600 hover:text-indigo-900 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </Td>
              <Td>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    checked={feeder.status === "Active"}
                    onChange={() => handleStatusToggle(feeder)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-green-600"></div>
                </label>
              </Td>

              <Td>{feeder.status === "Active" ? "ACTIVE" : "INACTIVE"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default KV33ConsumerFeederData;
