import React, { useEffect, useState } from "react";
//react-redux
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Store/api-slice";
import { basketUpdate, basketCountUpdate } from "../../Store/product-slice";
//components
import ProductGrid from "../Products/ProductGrid";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
//mui
import { Grid } from "@mui/material";
import Header from "../UI/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsSelector = useSelector((state) => state.api.products);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
      dispatch(getProducts(response.data));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Grid container className="main-ctr" spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Header>Products</Header>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          products.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
              className="card-ctr"
            >
              <ProductGrid key={item.id} product={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Products;
