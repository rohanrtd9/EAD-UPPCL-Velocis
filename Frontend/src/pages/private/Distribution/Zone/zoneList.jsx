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

function ZoneList() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();

  const fetchZones = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/list-zone`, {
        page,
        limit: itemsPerPage,
      });
      setZones(response.data.result.docs);
      setTotalPages(response.data.result.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch zones.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch zone details!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    fetchZones(currentPage);
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
        await axios.delete(`${apiUrl}/delete-zone`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The zone has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        await fetchZones(currentPage);
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
    const obj = encodeURIComponent(JSON.stringify(data));
    navigate(`/zoneAction/${obj}`);
  };

  const pagesToShow = 4; // Number of page buttons to show

  // Calculate the range of pages to show
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="Zone (Distribution)"
        action={{
          button: "Add Zone",
          path: "/zoneAction/addZone",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Zone</Th>
            <Th>Zone Code</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {zones.map((zone, index) => (
            <Tr key={zone._id}>
              <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
              <Td>{zone.zoneName}</Td>
              <Td>{zone.zoneCode || "-"}</Td>
              <Td flex={true}>
                <button
                  onClick={() => handleDelete(zone._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => editConnection(zone)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <PencilSquareIcon className="h-6 w-6" />
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

export default ZoneList;
