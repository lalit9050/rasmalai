import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from "../redux/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude)
      console.log(longitude)
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`,
      );
      const data = result?.data?.results[0];
      const city =
        data?.city ||
        data?.town ||
        data?.village ||
        data?.county ||
        data?.state;
      dispatch(setCurrentCity(city))
      dispatch(setCurrentState(data?.state))
      dispatch(setCurrentAddress(data?.address_line2 || 
      data?.address_line1))
    },null, {
        enableHighAccuracy: true, // 🔥 important
        timeout: 10000,
        maximumAge: 0,
      });
  }, []);
}

export default useGetCity;
