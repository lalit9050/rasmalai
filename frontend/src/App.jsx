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
import EditItems from './pages/EditItems'
import useGetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemsByCity'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlaced from './pages/OrderPlaced'
import MyOrders from './pages/MyOrders'
import useGetMyOrders from './hooks/useGetMyOrders'

export const serverUrl="http://localhost:8000"

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()
  const {userData} = useSelector(state=>state.user)
  return (
<Routes>
    <Route path='/siqnup' element={!userData?<SiqnUp/>:<Navigate to={"/"}/> } />
    <Route path='/siqnin' element={!userData?<SiqnIn />: <Navigate to={"/"}/>} />
    <Route path='/forgot-password' element={!userData?<ForgotPassword/>: <Navigate to={"/"}/>} />
    <Route path='/' element={ userData?<Home/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/create-edit-shop' element={ userData?<CreateEditShop/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/add-item' element={ userData?<AddItems/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/edit-item/:itemId' element={ userData?<EditItems/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/cart' element={ userData?<CartPage/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/checkout' element={ userData?<CheckOut/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/order-placed' element={ userData?<OrderPlaced/>:<Navigate to ={"/siqnin"}/>} />
    <Route path='/my-orders' element={ userData?<MyOrders/>:<Navigate to ={"/siqnin"}/>} />
    


</Routes>
  )
}

export default App