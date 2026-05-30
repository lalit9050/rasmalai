import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setUserData } from '../redux/userSlice'

function useGetShopByCity() {
    const dispatch = useDispatch()
    const {currentCity} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchShop = async () => {
            if(!currentCity) {
                console.log("currentCity is empty:", currentCity)  // ← check this
                return
            }
        try {
                console.log("Fetching shops for city:", currentCity)  // ← check city value
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,{withCredentials:true})
                        console.log("Shops result:", result.data)  // ← check response
                dispatch(setShopsInMyCity(result.data))
                
            }
            
        catch (error) {
                            console.log("Error:", error.response?.data)  // ← check error message

            console.log(error)
        }
    }
    fetchShop()
    },[currentCity])
}

export default useGetShopByCity