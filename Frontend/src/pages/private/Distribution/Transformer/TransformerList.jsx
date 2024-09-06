import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import Loader from "../../../../component/Loader";
import { apiUrl } from "../../../../utils/constant";
import { useUserContext } from "../../../../utils/userContext";
import "./../../../../component/pagination.css";

function TransformerList() {
  const navigate = useNavigate();
  const [transformers, setTransformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const { token } = useUserContext();

  const fetchTransformers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/list-transformer`, {
        params: {
          page,
          limit: itemsPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { docs, totalPages } = response.data.result;
      setTransformers(docs);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch transformer details.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch transformer details!",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    fetchTransformers(currentPage);
  }, [currentPage]);

  const pagesToShow = 4;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        title="Transformer List"
        action={{
          button: "",
          path: "",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>T_ID</Th>
            <Th>Distribution Substation Name</Th>
            <Th>Transformer Capacity(MVA)</Th>
            <Th>Quantity of Transformer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transformers.map((transformer, index) => (
            <Tr key={transformer._id}>
              <Td>{(currentPage - 1) * itemsPerPage + index + 1}</Td>
              <Td>{transformer.T_ID}</Td>
              <Td>{transformer.distributionSubstationName}</Td>
              <Td>{transformer.transformerCapacity}</Td>
              <Td>{transformer.transformerQuantity}</Td>
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

export default TransformerList;
