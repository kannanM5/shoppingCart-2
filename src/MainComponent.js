import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import classes from "../src/myApp.module.css";
import heart from "../src/icons8-heart-24.png";
import heart1 from "../src/icons8-heart-suit-48.png";
import minus from "../src/icons8-minus-24.png";
import plus from "../src/icons8-plus-24.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  fetchdataFailure,
  fetchdataRequest,
  fetchdatasuccess,
  CountQty,
  addToCart,
  wishlist,
} from "./redux/reducer";
import { trimString } from "./Utilities/common";

export default function MainComponent() {
  const dispatch = useDispatch();
  const dataitems = useSelector((state) => state.Data);
  const navigate = useNavigate();

  const fetchData = () => {
    dispatch(fetchdataRequest());

    axios
      .post("http://cbe.themaestro.in/ksnm/webservice/allproductlistforsearch")
      .then((res) => {
        let refData = [...res.data.products_list];
        refData = refData.map((ele1) => {
          return {
            ...ele1,
            Qty: 1,
            viewStatus: 0,
            wishlist: false,
          };
        });
        dispatch(fetchdatasuccess(refData));
      })
      .catch((error) => {
        dispatch(fetchdataFailure(error));
      });
  };

  useEffect(() => {
    if (dataitems.data.length === 0) fetchData();
  });

  if (dataitems.isLoading) {
    return <div>Loading...</div>;
  }

  if (dataitems.error) {
    return <div>Error: {dataitems.error}</div>;
  }

  const addtocart = (ele) => {
    dispatch(addToCart(ele));
  };

  const viewCart = (ele) => {
    ele.viewStatus === 1 ? navigate("/cart") : navigate("/");
  };

  return (
    <div>
      <div className={classes.cartBtn}>
        <button className="btn btn-secondary mt-2 px-3 py-0  mx-3">
          Wish List
          <span className={classes.cartCount}> {dataitems.wishlistCount}</span>
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="btn btn-success mt-2 px-3 py-0 "
        >
          Cart <span className={classes.cartCount}> {dataitems.cartCount}</span>
        </button>
      </div>

      <div className={classes.content}>
        {dataitems.data.map((ele, i) => {
          return (
            <React.Fragment key={ele.product_id}>
              <Card className={classes.show}>
                <Card.Img
                  className={classes.image}
                  variant="top"
                  src={ele.img_path}
                />
                <Card.Body>
                  <Card.Title className={classes.title}>
                    {trimString(ele.name, 40)}
                  </Card.Title>
                  <Card.Title className={classes.price}>{ele.price}</Card.Title>
                  <div className={classes.hide}>
                    {ele.wishlist ? (
                      <img
                        className={classes.wishlist}
                        src={heart1}
                        alt="wishList"
                        onClick={() => dispatch(wishlist(ele.product_id))}
                      />
                    ) : (
                      <img
                        className={classes.wishlist}
                        src={heart}
                        alt="wishList"
                        onClick={() => dispatch(wishlist(ele.product_id))}
                      />
                    )}

                    <button className={classes.incrementCount}>
                      <img
                        className={classes.countImage1}
                        src={plus}
                        alt="plus"
                        onClick={() => {
                          dispatch(
                            CountQty({
                              id: ele.product_id,
                              type: "INC",
                              Qty: ele.Qty,
                            })
                          );
                        }}
                      />
                      <span className={classes.Qty}> {ele.Qty}</span>
                      <img
                        className={classes.countImage2}
                        src={minus}
                        alt="plus"
                        onClick={() =>
                          dispatch(
                            CountQty({ id: ele.product_id, type: "DEC" })
                          )
                        }
                      />
                    </button>
                    <button
                      onClick={
                        ele.viewStatus === 1
                          ? () => viewCart(ele)
                          : () => addtocart(ele)
                      }
                      className={classes.cart}
                    >
                      {ele.viewStatus === 1 ? "view cart" : "Add to cart"}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
