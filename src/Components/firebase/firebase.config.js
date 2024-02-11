/* .env.local
VITE_apiKey=AIzaSyDzGg0hEtgQAXVO6kyiWguuQ4FJY9gQOsI
VITE_authDomain=email-password-caf10.firebaseapp.com
VITE_projectId=email-password-caf10
VITE_storageBucket=email-password-caf10.appspot.com
VITE_messagingSenderId=527078050124
VITE_appId=1:527078050124:web:e4ac483fcfc04c195d27e9
*/

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};


export const app = initializeApp(firebaseConfig);