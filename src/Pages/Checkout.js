import React, { useEffect, useState } from "react";
//react redux;
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutItem from "../Components/Checkout/CheckoutItem";
import Header from "../Components/UI/Header";
import { basketUpdate, basketTotal } from "../Store/product-slice";

const Checkout = () => {
  const dispatch = useDispatch();
  const [basket, setBasket] = useState([]);
  const basketSelector = useSelector((state) => state.product.basket);

  var basketTotalPrice = 0;

  function countTotalPrice() {
    for (var i = 0; i < basketSelector.length; i++) {
      basketTotalPrice +=
        basketSelector[i].price * basketSelector[i].productCount;
    }

    dispatch(basketTotal(basketTotalPrice));
  }

  countTotalPrice();

  useEffect(() => {
    if (localStorage.getItem("basket")) {
      setBasket(JSON.parse(localStorage.getItem("basket")));
      dispatch(basketUpdate(JSON.parse(localStorage.getItem("basket"))));
    } else {
      setBasket(basketSelector);
    }
  }, []);
  return (
    <div className="main-ctr">
      <Header>Checkout</Header>
      {basketTotalPrice > 0 ? (
        <div className="card-checkout">
          {basketSelector
            .filter((item) => item.productCount > 0)
            .map((filteredName) => (
              <CheckoutItem key={filteredName.id} product={filteredName} />
            ))}

          <div className="buy-now-detail">
            <div className="product-total">
              <p>
                <span>Total : </span>$ {basketTotalPrice.toFixed(2)}
              </p>
            </div>
            <Link to="/card" className="buy-now-button-detail">
              Buy now
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>There is no item !</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="buy-now-button-card">Look at some products</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
