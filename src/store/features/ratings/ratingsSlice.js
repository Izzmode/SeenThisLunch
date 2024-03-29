import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ratingsService from "./ratingsService";

const initialState = {
  ratings: [],
  error: null,
  loading: false,
  userRatings: [],
  allRatings: [],
}

export const addRating = createAsyncThunk('ratings/addRating', async ({ userId, restaurantId, rating }, thunkAPI) => {
  try {
    await ratingsService.addRatingAsync(userId, restaurantId, rating);
    return { userId, restaurantId, rating };

  } catch(err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getRatingsByRestaurant = createAsyncThunk('ratings/getRatingsByRestaurant', async ({restaurantId}, thunkAPI) => {
  try {
    const ratings = await ratingsService.getRatingsByRestaurantAsync(restaurantId);
    return ratings

  } catch(err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
export const getAllRatings = createAsyncThunk('ratings/getAllRatings', async (_, thunkAPI) => {
  try {
    const ratings = await ratingsService.getAllRatingsAsync();
    return ratings

  } catch(err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getUserRatings = createAsyncThunk('ratings/getUserRatings', async ({userId}, thunkAPI) => {
  try {
        const userRatings = await ratingsService.getRatingsByUserAsync(userId);
        const serializedUserRatings = userRatings.map(rating => ({
          ...rating,
          createdAt: rating.createdAt ? rating.createdAt.toISOString() : null
        }));
        return serializedUserRatings;

  } catch(err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const ratingsSlice = createSlice({
  name: 'Ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRating.pending, (state) => {
        state.loading = true
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.ratings = [...state.ratings, action.payload]
      })
      .addCase(addRating.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })


      .addCase(getRatingsByRestaurant.pending, (state) => {
        state.loading = true
      })
      .addCase(getRatingsByRestaurant.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.ratings = action.payload;
      })
      .addCase(getRatingsByRestaurant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })
      

      .addCase(getUserRatings.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserRatings.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.userRatings = action.payload;
      })
      .addCase(getUserRatings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })

      .addCase(getAllRatings.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        state.allRatings = action.payload;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload;
      })
  }
})

export default ratingsSlice.reducer