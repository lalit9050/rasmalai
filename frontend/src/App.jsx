import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiqnUp from './pages/SiqnUp'
import SiqnIn from './pages/SiqnIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'
import AddItems from './pages/AddItems'
export const serverUrl="http://localhost:8000"

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const {userData} = useSelector(state=>state.user)
  return (
<Routes>
    <Route path='/siqnup' element={!userData?<SiqnUp/>:<Navigate to={"/"}/> } />
    <Route path='/siqnin' element={!userData?<SiqnIn />: <Navigate to={"/"}/>} />
    <Route path='/forgot-password' element={!userData?<ForgotPassword/>: <Navigate to={"/"}/>} />
    <Route path='/' element={ userData?<Home/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/create-edit-shop' element={ userData?<CreateEditShop/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/add-item' element={ userData?<AddItems/>:<Navigate to ={"/siqnin"}/>} />

</Routes>
  )
}

export default App