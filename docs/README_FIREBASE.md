# Firebase setup notes

1. Create project in Firebase Console.
2. Enable Authentication (Email/Password).
3. Create Firestore database (in production mode for secure rules).
4. Enable Firebase Storage if you want to upload product images.
5. For backend, create a service account:
   - Project Settings -> Service accounts -> Generate new private key
   - Download JSON and place it as `backend/serviceAccountKey.json` (do NOT commit to GitHub)
6. Update `frontend/src/firebase.js` with your Firebase config values.
7. Deploy / run:
   - Frontend: `npm install` then `npm start` inside `frontend/`
   - Backend: `npm install` then `npm run dev` inside `backend/`
