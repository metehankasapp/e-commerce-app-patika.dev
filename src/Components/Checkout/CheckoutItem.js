import React from "react";
//react redux;
import { useDispatch } from "react-redux";
import { removeFromBasket, addToBasket } from "../../Store/product-slice";
import { Link } from "react-router-dom";
//
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const CheckoutItem = ({ product }) => {
  const dispatch = useDispatch();

  const addOneToBasketHandler = () => {
    dispatch(addToBasket(product));
  };

  const removeOneFromBasketHandler = () => {
    dispatch(removeFromBasket(product));
  };

  return (
    <div className="card-checkout-inner" key={product.id}>
      <div className="card-checkout-inner-content-fst">
        <Link to={`/product/${product.id}`}>
          {" "}
          <img src={product.image} alt="" />
        </Link>
        <div
          style={{
            marginLeft: "1.5rem",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
            flexDirection: "column",
          }}
        >
          <p className="product-grid-title-sc">{product.title}</p>
          <p className="prod-grid-price">
            $ {(product.price * product.productCount).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="card-checkout-inner-content-sc">
        <button onClick={addOneToBasketHandler}>
          <div className="add-to-basket">
            <AddIcon className="add-to-basket-icon" />
          </div>
        </button>
        <span>{product.productCount}</span>
        <button onClick={removeOneFromBasketHandler}>
          <div className="add-to-basket">
            <RemoveIcon className="add-to-basket-icon" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
