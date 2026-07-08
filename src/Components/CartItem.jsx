// src/Components/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  updateQuantity, 
  removeItem 
} from '../features/cart/CartSlice';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const getItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality will be available in the next update.');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/plants" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.name} />
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${getItemTotal(item).toFixed(2)}</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>
                    +
                  </button>
                </div>

                <button 
                  className="delete-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
            
            <div className="cart-actions">
              <Link to="/plants" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
