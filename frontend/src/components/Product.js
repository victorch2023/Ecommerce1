import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(()=> {
    async function load(){
      const ref = doc(db, 'products', id);
      const snap = await getDoc(ref);
      if(snap.exists()) setProduct({ id: snap.id, ...snap.data() });
    }
    load();
  },[id]);
  if(!product) return <div>Loading...</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  )
}
