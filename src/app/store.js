import { configureStore } from '@reduxjs/toolkit';
import  counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';

const routeReducer = {
    counter : counterReducer,
    user : userReducer,
};

const store = configureStore({
    reducer : routeReducer,
});

export default store;