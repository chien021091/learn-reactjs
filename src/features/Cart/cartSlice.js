import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        showMiniCart : false,
        cartItems : [],
    },
    reducers : {
        showMiniCart(state){
            state.showMiniCart = true;
        },
        hideMiniCart(state){
            state.showMiniCart = false;
        },
        addToCard(state, action){
            const newItem = action.payload;
            const index = state.cartItems.findIndex(item => item.id === newItem.id);
            if (index >= 0){
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
                
        },
        setQuanity(state, action){
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex(item => item.id === id);
            if (index >= 0){
                state.cartItems[index].quantity = quantity;
            }
        },
        removeFromCart(state, action){
            const idNeedRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== idNeedRemove);
        }
    }
});

const { actions, reducer } = cartSlice;

export const { showMiniCart, hideMiniCart, addToCard, setQuanity, removeFromCart } = actions;
export default reducer;