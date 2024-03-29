import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import restaurantService from "./restaurantService";

const initialState = {
  restaurants: [],
  restaurantsById: [],
  error: null,
  loading: false,
  restaurant: null
}

export const addRestaurant = createAsyncThunk('restaurants/add', async (formData, thunkAPI) => {
  try {
    return await restaurantService.createRestaurant(formData)
    
  } catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})
export const getRestaurants = createAsyncThunk('/', async (_, thunkAPI) => {
  try {
    return await restaurantService.getAllRestaurants()
  } catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})
export const getRestaurantsById = createAsyncThunk('/profile', async ({ids}, thunkAPI) => {
  try {
    return await restaurantService.getRestaurantsByIds(ids)
  } catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})
export const getRestaurant = createAsyncThunk('/restaurants/fetchById', async ({collection, id}, thunkAPI) => {
  try {
    return await restaurantService.getRestaurant(collection, id)
  } catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const restaurantSlice = createSlice({
  name: 'Restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.restaurants = [...state.restaurants, action.payload]
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })


      .addCase(getRestaurants.pending, (state) => {
        state.loading = true
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.restaurants = action.payload
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })


      .addCase(getRestaurant.pending, (state) => {
        state.loading = true
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.restaurant = action.payload
      })
      .addCase(getRestaurant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })


      .addCase(getRestaurantsById.pending, (state) => {
        state.loading = true
      })
      .addCase(getRestaurantsById.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.restaurantsById = action.payload
      })
      .addCase(getRestaurantsById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })
  }
})

export default restaurantSlice.reducer