import { configureStore } from '@reduxjs/toolkit'
import restaurantSlice from './features/restaurants/restaurantSlice'
import authSlice from './features/auth/authSlice'
import ratingsSlice from './features/ratings/ratingsSlice'


export const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
    auth: authSlice,
    ratings: ratingsSlice,
  }
})