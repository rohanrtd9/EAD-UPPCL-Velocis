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

function DivisionList() {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();

  const fetchDivisions = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}transmission/list-division`,
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
      setDivisions(docs);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch division details.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch division details!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    fetchDivisions(currentPage);
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
        await axios.delete(`${apiUrl}transmission/delete-division`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The division has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        await fetchDivisions(currentPage);
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

  const editDivision = (division) => {
    const divisionData = encodeURIComponent(JSON.stringify(division));
    navigate(`/divisionTransmissionAction/${divisionData}`);
  };

  const pagesToShow = 4; // Number of page buttons to show
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="Division (Transmission)"
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
              Add Division
            </div>
          ),
          path: "/divisionTransmissionAction/addDivision",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Zone</Th>
            <Th>Circle</Th>
            <Th>Division</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {divisions.map((division, index) => (
            <Tr key={division._id}>
              <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
              <Td>{division.zoneDetails.zoneName}</Td>
              <Td>{division.circleDetails?.circleName}</Td>
              <Td>{division.divisionName}</Td>
              <Td flex={true}>
                <button
                  onClick={() => handleDelete(division._id)}
                  className="text-red-600 hover:text-red-800 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => editDivision(division)}
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
}

export default DivisionList;
