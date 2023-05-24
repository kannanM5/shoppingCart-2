// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import axios from "axios";
// import { Card } from "react-bootstrap";

// const Pagination = ({ pageCount, onPageChange }) => {
//   return (
//     <ReactPaginate
//       pageCount={pageCount}
//       onPageChange={onPageChange}
//       containerClassName="pagination"
//       activeClassName="active"
//     />
//   );
// };

// const ParentComponent = () => {
//   const [post, setPost] = React.useState([]);

//   const baseURL =
//     "http://cbe.themaestro.in/ksnm/webservice/allproductlistforsearch";

//   useEffect(() => {
//     axios
//       .post(baseURL)
//       .then((res) => {
//         console.log(res.data, "response");
//         setPost(res.data.products_list);
//       })
//       .catch((err) => {
//         console.log(err, "error");
//       });
//   }, []);
//   const [currentPage, setCurrentPage] = useState(0);

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   // Assuming you have some data to display
//   const itemsPerPage = 8;
//   const data = Array.from({ length: 150 }, (_, i) => `Item ${i + 1}`);

//   const pageCount = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   return (
//     <div>
//       {paginatedData.map((item) => (
//         <div key={item}>{item}</div>
//       ))}

//       <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
//     </div>
//   );
// };

// export default ParentComponent;
