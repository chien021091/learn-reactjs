import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import STORAGES_KEYS from '../../constants/storages-keys';

// First, create the thunk
export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
      //call API to register
      const data = await userApi.register(payload);

      //save data to local storage
      localStorage.setItem(STORAGES_KEYS.TOKEN, data.jwt);
      localStorage.setItem(STORAGES_KEYS.USER, JSON.stringify(data.user));

      //return user data
      return data.user;
    }
  )

  export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
      //call API to register
      const data = await userApi.login(payload);

      //save data to local storage
      localStorage.setItem(STORAGES_KEYS.TOKEN, data.jwt);
      localStorage.setItem(STORAGES_KEYS.USER, JSON.stringify(data.user));

      //return user data
      return data.user;
    }
  )

const userSlice = createSlice({
    name : 'user',
    initialState : {
        current : JSON.parse(localStorage.getItem(STORAGES_KEYS.USER)) || {},
        settings: {}
    },
    reducers : {
      logout(state, action){
        localStorage.removeItem(STORAGES_KEYS.USER);
        localStorage.removeItem(STORAGES_KEYS.TOKEN);
        state.current = {};
      }
    }, //sync action
    extraReducers : {
        [register.fulfilled] : (state, action) => {
            state.current = action.payload;
        },
        [login.fulfilled] : (state, action) => {
            state.current = action.payload;
        }
    }
});

const { reducer, actions } = userSlice;

export const { logout } = actions;

export default reducer;//default export