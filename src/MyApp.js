import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import heart from "../src/icons8-heart-24.png";
import plus from "../src/icons8-plus-24.png";
import minus from "../src/icons8-minus-24.png";
import classes from "../src/myApp.module.css";
import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromAPI } from "./redux/reduxThunk";

export default function MyApp() {
  const [post, setPost] = React.useState([]);

  useEffect(() => {
    axios
      .post(baseURL)
      .then((res) => {
        console.log(res.data, "response");
        setPost(res.data.products_list);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const baseURL =
    "http://cbe.themaestro.in/ksnm/webservice/allproductlistforsearch";

  // useEffect(() => {
  //   dispatch(fetchDataFromAPI());
  // }, [dispatch]);

  return (
    <div>
      <div className={classes.cartItems}>Cart</div>
      <div className={classes.content}>
        {post.map((ele, i) => {
          return (
            <Card className={classes.show} key={i}>
              <Card.Img
                className={classes.image}
                variant="top"
                src={ele.img_path}
              />
              <Card.Body>
                <Card.Title className={classes.title}>{ele.name}</Card.Title>
                <Card.Title className={classes.price}>{ele.price}</Card.Title>
                <div className={classes.hide}>
                  <img
                    className={classes.wishlist}
                    src={heart}
                    alt="wishList"
                  />
                  <button className={classes.incrementCount}>
                    <img
                      className={classes.countImage1}
                      src={plus}
                      alt="plus"
                    />
                    1
                    <img
                      className={classes.countImage2}
                      src={minus}
                      alt="plus"
                    />
                  </button>
                  <button className={classes.cart}>Add to cart</button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// const NewsCard = (props) => {
//   return (
//     <div style={{ padding: "5px" }}>
//       <a href={props.url}>
//         {props.title} by {props.author}
//       </a>
//     </div>
//   );
// };

// export default function MyApp() {
//   const [hits, setHits] = useState([]);
//   const [pageCount, setPageCount] = useState(1);
//   const [isLoaded, setisLoaded] = useState(false);
//   const [currentPage, setcurrentPage] = useState(0);
//   const [query, setQuery] = useState("startups");

//   const URL = `https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`;

//   const handleFetch = () => {
//     fetch(URL)
//       .then((response) => response.json())
//       .then((body) => {
//         setHits([...body.hits]);
//         setPageCount(body.nbPages);
//         console.log(body);
//         setisLoaded(true);
//       })
//       .catch((error) => console.error("Error", error));
//   };

//   const handlePageChange = (selectedObject) => {
//     setcurrentPage(selectedObject.selected);
//     handleFetch();
//   };

//   return (
//     <div>
//       <label>Search</label>
//       <input type="text" onChange={(event) => setQuery(event.target.value)} />
//       <button onClick={handleFetch}>Get Data</button>

//       {isLoaded ? (
//         hits.map((item) => {
//           return (
//             <NewsCard
//               url={item.url}
//               title={item.title}
//               author={item.author}
//               key={item.objectID}
//             />
//           );
//         })
//       ) : (
//         <div></div>
//       )}

//       {isLoaded ? (
//         <ReactPaginate
//           pageCount={pageCount}
//           pageRange={2}
//           marginPagesDisplayed={2}
//           onPageChange={handlePageChange}
//           containerClassName={"container"}
//           previousLinkClassName={"page"}
//           breakClassName={"page"}
//           nextLinkClassName={"page"}
//           pageClassName={"page"}
//           disabledClassNae={"disabled"}
//           activeClassName={"active"}
//         />
//       ) : (
//         <div>Nothing to display</div>
//       )}
//     </div>
//   );
// }

// const items = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
// ];

// function Items({ currentItems }) {
//   return (
//     <div>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </div>
//   );
// }

// function PaginatedItems({ itemsPerPage }) {
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     // console.log(
//     //   `User requested page number ${event.selected}, which is offset ${newOffset}`
//     // );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         previousLabel="< previous"
//         nextLabel="next >"
//         breakLabel="..."
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={3}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }

// export default function MyApp() {
//   return (
//     <div>
//       <PaginatedItems itemsPerPage={2} />,
//     </div>
//   );
// }
