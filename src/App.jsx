import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Add from "./pages/Add/Add"
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { useDispatch, useSelector } from "react-redux"
import { authReady } from "./store/features/auth/authSlice"
import Profile from "./pages/Profile/Profile"
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"

function App() {

  const { authIsReady } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      let user = null

      if(_user) {
        user = {
          uid: _user.uid,
          email: _user.email
        }
      }

      dispatch(authReady(user))
    })
  }, [])
  
  return (

    <>
    {authIsReady &&
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/add" element={
        <ProtectedRoute>
          <Add/>
        </ProtectedRoute>
      } />
      <Route path="/restaurants/:id" element={<RestaurantDetails/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
        } />
    </Routes>
    </>
    }
    </>
  )
}

export default App
