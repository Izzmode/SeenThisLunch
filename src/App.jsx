import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Add from "./pages/Add/Add"
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { useDispatch, useSelector } from "react-redux"
import { authReady } from "./store/features/auth/authSlice"
import Profile from "./pages/Profile/Profile"
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute"

function App() {

  const { authIsReady } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      let user = null

      if(_user) {
        user = {
          uid: _user.uid,
          email: _user.email,
          verifiedEmail: _user.verifiedEmail,
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
