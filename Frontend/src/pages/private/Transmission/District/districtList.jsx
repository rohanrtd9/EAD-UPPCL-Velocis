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

function DistrictList() {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();

  const fetchDistrict = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}transmission/list-districts`,
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
      setDistricts(docs);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch district details.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch district details!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    fetchDistrict(currentPage);
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
        await axios.delete(`${apiUrl}transmission/delete-district`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The district has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        await fetchDistrict(currentPage);
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

  const editDistrict = (data) => {
    const obj = encodeURIComponent(JSON.stringify(data));
    navigate(`/districtTransmissionAction/${obj}`);
  };

  const pagesToShow = 4;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="District (Transmission)"
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
              Add District
            </div>
          ),
          path: "/districtTransmissionAction/addDistrict",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>District</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {districts.map((district, index) => (
            <Tr key={district._id}>
              <Td>{index + 1 + (currentPage - 1) * itemsPerPage}</Td>
              <Td>{district.districtName}</Td>
              <Td flex={true}>
                <button
                  onClick={() => handleDelete(district._id)}
                  className="text-red-600 hover:text-red-800 w-6 h-7 p-1 flex items-center justify-center"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => editDistrict(district)}
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

export default DistrictList;
