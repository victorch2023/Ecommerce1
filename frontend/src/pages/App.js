import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Product from '../components/Product';
import Cart from '../components/Cart';
import Login from '../components/Login';

export default function App(){
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/cart'>Cart</Link> | <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
