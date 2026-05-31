import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../App'
import { useDispatch } from 'react-redux'
import { setUserData,setIsLoading } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))
            } finally {
                dispatch(setIsLoading(false))
            }
        }
        fetchUser()
    }, [])
}

export default useGetCurrentUser