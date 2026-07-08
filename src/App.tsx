// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './Components/ProductList'; // ✅ Capital P and L
import CartItem from './Components/CartItem'; // ✅ Capital C and I
import AboutUs from './Components/AboutUs'; // ✅ Capital A and U
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                🌿 Paradise Nursery
              </Link>
              <ul className="nav-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/plants">Plants</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plants" element={<ProductList />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Bring nature into your home with our beautiful houseplants</p>
        <Link to="/plants" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default App;
