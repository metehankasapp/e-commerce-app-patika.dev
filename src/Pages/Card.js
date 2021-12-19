import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button, Alert } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";

import { useDispatch, useSelector } from "react-redux";
import { basketTotal, basketUpdate } from "../Store/product-slice";
import Header from "../Components/UI/Header";

const Card = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();

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

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      TotalPrice: basketTotalPrice,
      BasketItems: basketSelector,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        TotalPrice: basketTotalPrice,
        BasketItems: basketSelector,
      };

      //resetform
      resetForm({ values: "" });
      // clear storage
      localStorage.clear();
      // show snackbar
      setOpen(true);
      //reload
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("basket")) {
      dispatch(basketUpdate(JSON.parse(localStorage.getItem("basket"))));
    }
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <div className="alert-on-confirm">
            <h4>Thank you for your order !</h4>
            <p>Email: {formik.values.email}</p>
            <p>First Name: {formik.values.firstName}</p>
            <p>Last Name: {formik.values.lastName}</p>
            <p>Total: $ {formik.values.TotalPrice}</p>
            {basketSelector
              .filter((name) => name.productCount > 0)
              .map((itemFiltered) => (
                <div key={itemFiltered.id}>
                  <div>{itemFiltered.title}</div>
                  <div style={{ display: "flex" }}>
                    <div className="card-price-right">{itemFiltered.price}</div>
                    <span>x</span>
                    <div className="card-price-left">
                      {itemFiltered.productCount}
                    </div>
                    <span style={{ margin: "0 5px" }}> = </span> $
                    {itemFiltered.price * itemFiltered.productCount.toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </Alert>
      </Snackbar>
      <div className="main-ctr">
        <Header>Card</Header>
        <div className="card-card">
          {basketTotalPrice > 0 ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="input-ctr">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                ) : null}
              </div>

              <div className="input-ctr">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
              </div>

              <div className="input-ctr">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="product-total product-total-card">
                {basketSelector
                  .filter((name) => name.productCount > 0)
                  .map((itemFiltered) => (
                    <div key={itemFiltered.id}>
                      <div>{itemFiltered.title}</div>
                      <div style={{ display: "flex" }}>
                        <div className="card-price-right">
                          {itemFiltered.price}
                        </div>
                        <span>x</span>
                        <div className="card-price-left">
                          {itemFiltered.productCount}
                        </div>
                        <span style={{ margin: "0 5px" }}> = </span> $
                        {itemFiltered.price *
                          itemFiltered.productCount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                <p>
                  <span>Total : </span>$ {basketTotalPrice.toFixed(2)}
                </p>
              </div>
              <button type="submit" className="buy-now-button-card">
                Buy
              </button>
            </form>
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
      </div>
    </div>
  );
};

export default Card;
