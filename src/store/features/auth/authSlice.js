import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"
import { auth } from '../../../firebase/config'


const initialState = {
  user: null,
  loading: false,
  error: null,
  authIsReady: false,
  verifiedEmail: false
}

export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    return await authService.signup(formData.email, formData.password);
  }
  catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    return await authService.login(formData.email, formData.password);
  }
  catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  }
  catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})
export const resetPassword = createAsyncThunk('auth/forgot-password', async (email, thunkAPI) => {
  try {
    return await authService.resetPassword(email);
  }
  catch(err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    authReady: (state, action) => {
      state.user = action.payload
      state.authIsReady = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.verifiedEmail = action.payload.verifiedEmail
        state.loading = false
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      .addCase(loginUser.pending, state => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.verifiedEmail = action.payload.verifiedEmail
        state.loading = false
        state.error = null
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  }
})


export const { setError, authReady } = authSlice.actions
export default authSlice.reducer