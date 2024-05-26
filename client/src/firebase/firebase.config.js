// import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// }

// export const app = initializeApp(firebaseConfig)
// -----------------------------------------

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDekHXLt8HieZwcM42nMnfZRBHlgCWA9xY",
  authDomain: "stayvista-b25c5.firebaseapp.com",
  projectId: "stayvista-b25c5",
  storageBucket: "stayvista-b25c5.appspot.com",
  messagingSenderId: "776939458",
  appId: "1:776939458:web:ef7ba59def59ceb4a4185b",
};

export const app = initializeApp(firebaseConfig);
