import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import classes from "../src/myApp.module.css";
import heart from "../src/icons8-heart-24.png";
import minus from "../src/icons8-minus-24.png";
import plus from "../src/icons8-plus-24.png";
import QtyCount from "./ButtonCount";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  fetchdataFailure,
  fetchdataRequest,
  fetchdatasuccess,
  incrementCount,
  decrementCount,
  addToCart,
} from "./redux/reducer";
import { trimString } from "./Utilities/common";

export default function MainComponent() {
  const dispatch = useDispatch();
  const dataitems = useSelector((state) => state.Data);

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
            cartCount: 0,
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

  return (
    <div>
      <div className={classes.cartbutton}>
        <button className="btn btn-warning px-4 py-0">cart</button>
        {dataitems.data.map((ele, i) => {
          return (
            <div key={ele.product_id} className={classes.cartCount}>
              {ele.cartCount}
            </div>
          );
        })}
        <div className={classes.cartCount}>{dataitems.cartCount}</div>
      </div>

      <div className={classes.content}>
        {dataitems.data.map((ele, i) => {
          return (
            <Card className={classes.show} key={ele.product_id}>
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
                    onClick={() => dispatch(addToCart(ele.product_id))}
                    className={classes.cart}
                  >
                    Add to cart{ele.cartCount}
                  </button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
