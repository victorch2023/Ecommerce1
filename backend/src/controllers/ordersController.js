import { db } from '../services/firebaseAdmin.js';

export async function createOrder(req,res){
  try{
    const data = req.body;
    const ref = await db.collection('orders').add({...data, createdAt: new Date()});
    res.json({ id: ref.id });
  }catch(e){ res.status(500).json({error:e.message}) }
}

export async function getOrder(req,res){
  try{
    const doc = await db.collection('orders').doc(req.params.id).get();
    if(!doc.exists) return res.status(404).json({error:'Not found'});
    res.json({ id:doc.id, ...doc.data() });
  }catch(e){ res.status(500).json({error:e.message}) }
}
