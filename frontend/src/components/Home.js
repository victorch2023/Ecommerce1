import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    async function load(){
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  },[]);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(p=> <li key={p.id}><Link to={'/product/'+p.id}>{p.name} - ${p.price}</Link></li>)}
      </ul>
    </div>
  )
}
