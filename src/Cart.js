import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "../src/myApp.module.css";
import { removeItem, emptyCart, CountQty } from "./redux/reducer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";

export default function Cart() {
  const dataItems = useSelector((state) => state.Data);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emptycart = (arr) => {
    arr.map((e, i) => {
      return dispatch(emptyCart(e.product_id));
    });

    setModalShow(true);
  };

  let total = dataItems.cartItems.reduce((acc, cur) => {
    return acc + cur.sub_Total;
  }, 0);
  let newTotal = `₹  ${total}.00`;

  return (
    <>
      <div className="container mt-5">
        <div className={classes.topNav}>
          <div>
            <Button
              variant="secondary"
              style={{ fontSize: "12px" }}
              onClick={() => navigate("/")}
            > Home</Button>
          </div>
          <div>
            <Button
              variant="primary"
              style={{ fontSize: "12px" }}
              onClick={() => emptycart(dataItems.cartItems)}
            >  Empty Cart </Button>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Product Name</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Sub-Total</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px", cursor: "pointer" }}>
            {dataItems.cartItems.map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <tr className="text-center align-baseline">
                    <td>{e.name}</td>
                    <td>
                      {
                        <img
                          className={classes.dataImg}
                          src={e.img_path}
                          alt="img"
                        />
                      }
                    </td>
                    <td>
                      <span
                        onClick={() =>
                          dispatch(CountQty({ id: e.product_id, type: "INC" }))
                        }
                        className={classes.plus}
                      >
                        +
                      </span>
                      {e.Qty}
                      <span
                        onClick={() =>
                          dispatch(CountQty({ id: e.product_id, type: "DEC" }))
                        }
                        className={classes.sub}
                      >
                        -
                      </span>
                    </td>
                    <td>{e.price}</td>
                    <td>₹{e.sub_Total}.00</td>
                    <td>
                      <button
                        onClick={() =>
                          dispatch(removeItem({ id: e.product_id, index: i }))
                        }
                        style={{ fontSize: "12px" }}
                        className="btn btn-danger px-2 py-1 "
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <h4 className="text-center">Total Amount : {newTotal}</h4>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();

  const continueShopping = () => {
    navigate("/");
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your shopping cart is empty!</p>
        <p>please make sure you added the products to the cart...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={continueShopping}>Continue Shopping</Button>
      </Modal.Footer>
    </Modal>
  );
}
