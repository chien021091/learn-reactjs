import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name : 'counter',
    initialState : 0,
    reducers : {
        increment(state, action){
            return state + 1;
        },
        decrement(state, action){
            return state - 1;
        }

    }
});

const { actions, reducer } = counterSlice;

export const { increment, decrement } = actions; //named export
export default reducer;//default export