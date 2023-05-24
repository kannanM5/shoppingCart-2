import React, { useState } from "react";
import classes from "../src/myApp.module.css";
import minus from "../src/icons8-minus-24.png";
import plus from "../src/icons8-plus-24.png";
import Quantity from "./cartCount";
import { useNavigate } from "react-router-dom";

export default function QtyCount() {
  const [count, setcount] = useState(1);
  const navigate = useNavigate();

  const increment = () => {
    if (4 <= count) setcount(count + 1);
    // navigate("/", { state: { count } });
  };

  const decrement = () => {
    if (1 < count) setcount(count - 1);
  };
  return (
    <>
      <button className={classes.incrementCount}>
        <img
          className={classes.countImage1}
          src={plus}
          alt="plus"
          onClick={increment}
        />
        {count}
        <img
          className={classes.countImage2}
          src={minus}
          alt="plus"
          onClick={decrement}
        />
      </button>
    </>
  );
}
