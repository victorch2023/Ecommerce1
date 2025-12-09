import { db } from '../services/firebaseAdmin.js';

export async function listProducts(req, res){
  try{
    const snap = await db.collection('products').get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(data);
  }catch(e){ res.status(500).json({error:e.message}) }
}

export async function getProduct(req,res){
  try{
    const doc = await db.collection('products').doc(req.params.id).get();
    if(!doc.exists) return res.status(404).json({error:'Not found'});
    res.json({ id:doc.id, ...doc.data() });
  }catch(e){ res.status(500).json({error:e.message}) }
}

export async function createProduct(req,res){
  try{
    const data = req.body;
    const ref = await db.collection('products').add(data);
    res.json({ id: ref.id });
  }catch(e){ res.status(500).json({error:e.message}) }
}

export async function updateProduct(req,res){
  try{
    await db.collection('products').doc(req.params.id).set(req.body, { merge:true });
    res.json({ ok:true });
  }catch(e){ res.status(500).json({error:e.message}) }
}

export async function deleteProduct(req,res){
  try{
    await db.collection('products').doc(req.params.id).delete();
    res.json({ ok:true });
  }catch(e){ res.status(500).json({error:e.message}) }
}
