import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

//react-redux
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorite,
  addToBasket,
  removeFromFavorite,
  favoritesUpdate,
} from "../../Store/product-slice";
//components

const ProductGrid = ({ product }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const favoritesSelector = useSelector((state) => state.product.favorites);
  const basketSelector = useSelector((state) => state.product.basket);

  const addToBasketHandler = (item) => {
    const productObject = {
      category: product.category,
      description: product.description,
      id: product.id,
      image: product.image,
      price: product.price,
      rating: { rate: product.rating.rate, count: product.rating.count },
      title: product.title,
      productCount: 1,
    };
    dispatch(addToBasket(productObject));
  };

  const addToFavoriteHandler = () => {
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(removeFromFavorite(product.id));
    } else {
      setIsFavorite(true);
      dispatch(addToFavorite(product.id));
    }
  };

  const goToBasketHandler = () => {};

  useEffect(() => {
    // if favorite set heart bg-color;
    if (localStorage.getItem("favorites")) {
      const array = localStorage.getItem("favorites").split(",");

      if (array.find((item) => item === String(product.id))) {
        setIsFavorite(true);
      } else {
      }
    }
  }, []);

  return (
    <div className="product-grid">
      <div className="grid-inner">
        <button onClick={addToFavoriteHandler}>
          {isFavorite ? (
            <FavoriteIcon className="add-to-favorite" />
          ) : (
            <FavoriteBorderIcon className="add-to-favorite" />
          )}
        </button>

        <div className="product-photo">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt="" className="grid-photo" />
          </Link>
        </div>
        <div className="product-grid-content">
          <div className="product-grid-title">
            <p>{product.title}</p>
          </div>
          <div className="product-grid-footer">
            <div className="prod-grid-price"> $ {product.price}</div>
            <button onClick={addToBasketHandler}>
              <div className="add-to-basket">
                <AddIcon className="add-to-basket-icon" />
              </div>
            </button>
          </div>

          <Link to={`product/${product.id}`} className="buy-now-button">
            Buy now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
