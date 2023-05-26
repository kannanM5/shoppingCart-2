import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import classes from "../src/myApp.module.css";
import heart from "../src/icons8-heart-24.png";
import minus from "../src/icons8-minus-24.png";
import plus from "../src/icons8-plus-24.png";
import cart from "../src/icons8-cart-30.png";
import QtyCount from "./ButtonCount";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  fetchdataFailure,
  fetchdataRequest,
  fetchdatasuccess,
  incrementCount,
  decrementCount,
  addToCart,
  viewToCart,
} from "./redux/reducer";
import { trimString } from "./Utilities/common";

export default function MainComponent() {
  const dispatch = useDispatch();
  const dataitems = useSelector((state) => state.Data);
  const navigate = useNavigate();
  const cartValue = useSelector((state) => state.Data.data.cartCount);

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
          };
        });

        dispatch(fetchdatasuccess(refData));
        console.log(dispatch(fetchdatasuccess(refData)));
      })
      .catch((error) => {
        dispatch(fetchdataFailure(error));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataitems.isLoading) {
    return <div>Loading...</div>;
  }

  if (dataitems.error) {
    return <div>Error: {dataitems.error}</div>;
  }

  const addtocart = (ele) => {
    dispatch(addToCart(ele));
    // ele.viewStatus === 1 ? navigate("/cart") : navigate("/");
  };

  const viewCart = (ele) => {
    dispatch(viewToCart(ele));
    ele.viewStatus === 1 ? navigate("/cart") : navigate("/");
  };

  return (
    <div>
      <div className={classes.cartBtn}>
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
                        onClick={() => {
                          dispatch(incrementCount(ele.product_id));
                        }}
                      />
                      {ele.Qty}
                      <img
                        className={classes.countImage2}
                        src={minus}
                        alt="plus"
                        onClick={() => dispatch(decrementCount(ele.product_id))}
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
