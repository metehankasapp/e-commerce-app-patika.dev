import React, { useEffect, useState } from "react";
import Products from "../Components/Products/Products";
//react-redux
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Store/api-slice";
import { basketUpdate, basketCountUpdate } from "../Store/product-slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("basket")) {
      const array = JSON.parse(localStorage.getItem("basket"));
      dispatch(basketUpdate(array));
    }

    if (localStorage.getItem("basket-count")) {
      const basketCount = localStorage.getItem("basket-count");
      dispatch(basketCountUpdate(Number(basketCount)));
    }
  }, []);
  return <Products />;
};

export default Home;
