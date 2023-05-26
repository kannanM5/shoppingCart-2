import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainComponent from "./MainComponent";
import Cart from "./Cart";

const Router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        index: true,
        element: <MainComponent />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

function RouterConfigure() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default RouterConfigure;
