import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../Store/product-slice";
import CircularProgress from "@mui/material/CircularProgress";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const [products, setProducts] = useState([]);

  const currentProduct = products.find((item) => item.id === Number(id));

  const addToBasketHandler = () => {
    const currentProductObj = { ...currentProduct, productCount: 1 };
    dispatch(addToBasket(currentProductObj));
    navigate("/checkout");
  };

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="main-ctr">
      {!currentProduct ? (
        <CircularProgress />
      ) : (
        <div className="card-product-detail">
          <div className="product-detail-image">
            <img src={currentProduct.image} alt={currentProduct.title} />
          </div>
          <div className="product-detail-content">
            <div className="product-detail-title">
              <p>{currentProduct.title}</p>
            </div>
            <div className="product-detail-category">
              <p>
                <span>Category : </span>
                {currentProduct.category}
              </p>
            </div>

            <div className="product-detail-category">
              <p>
                <span>Rate : </span>
                {currentProduct.rating.rate} ({currentProduct.rating.count})
              </p>
            </div>

            <div className="product-detail-category">
              <div className="detail-description">
                <span>Description :</span>
                <p>{currentProduct.description}</p>
              </div>
            </div>

            <div className="product-detail-category">
              <p>
                <span>Price : </span>$ {currentProduct.price}
              </p>
            </div>

            <div className="buy-now-detail">
              <button
                onClick={addToBasketHandler}
                className="buy-now-button-detail"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
