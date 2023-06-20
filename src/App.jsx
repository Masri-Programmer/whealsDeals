import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setIsLoggedIn, login, setUserProfile, setCart } from '@slices';
import { getCart } from './utils/apis/Get'
import './index.css';
import axios from 'axios';
import styles from './style';

import {
  Buy, Rent, Footer, Home, Navigation, OwnerProfile,
  ScrollButton, ScrollToTop, About, WhishList,
  AlertComp, CarDetails, CarBlog, Profile, NoMatch, Sell,
} from '@index';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const { user } = useSelector((state) => state.users);
  const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
  const session_id = sessionStorage.getItem("session_id");
  const isSignedIn = sessionStorage.getItem('isSignedIn') === 'true';
  const data = useSelector((state) => state.cars.cart);

  // ...FETCH BOX
  useEffect(() => {
    const cartToken = token && token !== "null" && token !== "undefined" ? token : "";
    const cartSessionId = session_id && session_id !== "null" && session_id !== "undefined" ? session_id : "";
    if (!token && !session_id || token || session_id) {
      getCart(cartToken, cartSessionId)
        .then((data) => {
          dispatch(setCart(data));
        });
    }
  }, [isLoggedIn, token, session_id]);


  // ...AUTO LOGIN
  useEffect(() => {
    if (!isLoggedIn || isSignedIn) {
      let formData = new FormData();
      formData.append("token", token);
      const url = `${styles.base_url}/users/auto-login`;
      axios
        .post(url, formData)
        .then((res) => {
          const responseData = res.data;
          if (responseData.succeeded) {
            localStorage.setItem("user_id", responseData.user.user_id);
            localStorage.setItem("user_name", responseData.user.user_name);
            if (isSignedIn) {
              sessionStorage.setItem("token", responseData.user.token);
            } else {
              localStorage.setItem("token", responseData.user.token);
            }
            // dispatch(setToken(responseData.user.token))
            dispatch(setUserProfile(responseData.user))
            dispatch(login());
          }
          else {
            localStorage.setItem("token", null);
            localStorage.setItem("user_id", null);
            // sessionStorage.setItem("session_id", null);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className='bg-gray-900'>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/about" element={<About />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/blog" element={<CarBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<OwnerProfile />} />
        <Route path="/whish-list" element={<WhishList />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <AlertComp />
      <Footer />
      <ScrollButton />
    </div>
  );
}

export default App;
