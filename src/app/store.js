import { configureStore } from '@reduxjs/toolkit';
import  counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';

const routeReducer = {
    counter : counterReducer,
    user : userReducer,
    cart : cartReducer,
};

const store = configureStore({
    reducer : routeReducer,
});

export default store;