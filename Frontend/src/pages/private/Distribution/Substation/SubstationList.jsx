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

const SubstationList = () => {
  const navigate = useNavigate();
  const [substation, setSubstation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();

  const fetchSubstation = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}distribution/list-substation`,
        {
          page,
          limit: itemsPerPage,
        }
      );
      setSubstation(response.data.result.docs);
      setTotalPages(response.data.result.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch substation details.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch substation details!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    fetchSubstation(currentPage);
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
        await axios.delete(`${apiUrl}distribution/delete-substation`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The substation has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        await fetchSubstation(currentPage);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const editConnection = (data) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    navigate(`/substationAction/${encodedData}`);
  };

  const pagesToShow = 4; // Number of page buttons to show
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="Substations"
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
              Add Substation
            </div>
          ),
          path: "/substationAction/AddSubstation",
        }}
      />

      <Table>
        <Thead>
          <Tr>
            <Th>Sr No</Th>
            <Th>Division</Th>
            <Th>Distribution Sub-Station Name</Th>
            <Th>Distribution Sub-Station Code</Th>
            <Th>Voltage of Unit Sub-Station</Th>
            <Th>Junior Engineer Name</Th>
            <Th>Junior Engineer Mobile No.</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {substation.map((station, index) => (
            <Tr key={station._id}>
              <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
              <Td>{station.divisionName}</Td>
              <Td>{station.substationName}</Td>
              <Td>{station.subStationCode}</Td>
              <Td>{station.capacityUnitSubStation}</Td>
              <Td>{station.jeeName}</Td>
              <Td>{station.jeeNumber}</Td>
              <Td flex={true}>
                <button
                  onClick={() => handleDelete(station._id)}
                  className="text-red-600 hover:text-red-800 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => editConnection(station)}
                  className="text-indigo-600 hover:text-indigo-900 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </Td>
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
};

export default SubstationList;
