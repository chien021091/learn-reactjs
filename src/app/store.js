import { configureStore } from '@reduxjs/toolkit';
import  counterReducer from '../features/Counter/counterSlice';

const routeReducer = {
    counter : counterReducer,
};

const store = configureStore({
    reducer : routeReducer,
});

export default store;