import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login(){
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [mode,setMode]=useState('login');

  async function submit(e){
    e.preventDefault();
    try{
      if(mode==='login'){
        await signInWithEmailAndPassword(auth, email, pass);
        alert('Logged in!');
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert('User created!');
      }
    }catch(err){ alert(err.message) }
  }

  return (
    <form onSubmit={submit}>
      <h3>{mode==='login' ? 'Login' : 'Register'}</h3>
      <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder='password' type='password' value={pass} onChange={e=>setPass(e.target.value)} />
      <button type='submit'>{mode==='login' ? 'Login' : 'Register'}</button>
      <button type='button' onClick={()=>setMode(mode==='login'?'register':'login')}>Switch</button>
    </form>
  )
}
