import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import ResponsiveAppBar from "./Components/UI/Navbar";
import Home from "./Pages/Home";
//react reudx
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Checkout from "./Pages/Checkout";
import Product from "./Components/Products/Product";
import Card from "./Pages/Card";
import Contact from "./Pages/Contact";
import { SnackbarProvider, useSnackbar } from "notistack";
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Router>
          <div className="">
            <ResponsiveAppBar />

            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/card" element={<Card />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
