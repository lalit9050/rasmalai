import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiqnUp from './pages/SiqnUp'
import SiqnIn from './pages/SiqnIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
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
import useUpdateLocation from './hooks/useUpdateLocation'
import TrackOrderPage from './pages/TrackOrderPage'
import Shop from './pages/Shop'
import { io } from 'socket.io-client'
import { setSocket, addMyOrder, updateRealtimeOrderStatus, assignDeliveryBoy } from './redux/userSlice'
import Welcome from './pages/Welcome'

export const serverUrl = "https://rasmalai-backend-d2o7.onrender.com"

const sendNotification = (title, body) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/vite.svg'
    })
  }
}

function App() {
  useGetCurrentUser()
  useUpdateLocation()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()

  const { userData,isLoading } = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Request notification permission once user is logged in
  useEffect(() => {
    if (userData && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [userData])

  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true })
    dispatch(setSocket(socketInstance))

    socketInstance.on('connect', () => {
      if (userData) {
        socketInstance.emit('identity', { userId: userData._id })
      }
    })

    socketInstance.on('newOrder', (data) => {
      console.log("newOrder received:", data)
      if (userData?.role === 'owner' && data.shopOrders?.owner._id == userData._id) {
        dispatch(addMyOrder(data))
        sendNotification(
          '🛒 New Order Received!',
          `${data.user?.name || 'A customer'} placed an order · ₹${data.shopOrders?.subtotal}`
        )
      }
    })

    socketInstance.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId == userData?._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
        sendNotification(
          '📦 Order Update',
          `Your order status changed to: ${status}`
        )
      }
    })

    socketInstance.on('delivery-boy-assigned', ({ orderId, shopId, deliveryBoy }) => {
      dispatch(assignDeliveryBoy({ orderId, shopId, deliveryBoy }))
      if (userData?.role === 'user') {
        sendNotification(
          '🛵 Delivery Boy Assigned!',
          `${deliveryBoy?.fullName} is delivering your order`
        )
      }
    })

    socketInstance.on('newAssignment', (data) => {
      if (data.sentTo == userData?._id) {
        sendNotification(
          '🆕 New Delivery Assignment!',
          `Pickup from ${data.shopName} · ₹${data.subtotal}`
        )
      }
    })

    if (isLoading) return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff9f6' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 900, color: '#ff4d2d' }}>Rasmalai</div>
    </div>
)

    return () => {
      socketInstance.disconnect()
    }
  }, [userData?._id])

  return (
    <Routes>
      <Route path='/siqnup' element={!userData ? <SiqnUp /> : <Navigate to={"/"} />} />
      <Route path='/siqnin' element={!userData ? <SiqnIn /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Welcome />} />
      <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/siqnin"} />} />
      <Route path='/add-item' element={userData ? <AddItems /> : <Navigate to={"/siqnin"} />} />
      <Route path='/edit-item/:itemId' element={userData ? <EditItems /> : <Navigate to={"/siqnin"} />} />
      <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/siqnin"} />} />
      <Route path='/checkout' element={userData ? <CheckOut /> : <Navigate to={"/siqnin"} />} />
      <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/siqnin"} />} />
      <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/siqnin"} />} />
      <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/siqnin"} />} />
      <Route path='/shop/:shopId' element={userData ? <Shop /> : <Navigate to={"/siqnin"} />} />
    </Routes>
  )
}

export default App