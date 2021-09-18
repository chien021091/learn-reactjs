import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

Cart.propTypes = {
    
};

function Cart(props) {

    const cartTotal = useSelector(cartTotalSelector);

    return (
        <div>
            Cart : {cartTotal}
        </div>
    );
}

export default Cart;