// src/Components/ProductList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/CartSlice';
import { plantsData } from '../data/plants';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
    setAddedItems(prev => ({ ...prev, [plant.id]: true }));
  };

  const isItemInCart = (id) => {
    return cartItems.some(item => item.id === id) || addedItems[id];
  };

  return (
    <div className="products-container">
      <h1>Our Houseplants</h1>
      
      {Object.keys(plantsData).map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="plant-grid">
            {plantsData[category].map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p className="price">${plant.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(plant)}
                  disabled={isItemInCart(plant.id)}
                >
                  {isItemInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
