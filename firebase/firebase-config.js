import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const db = getFirestore(app)
export const dataRef = collection(db, "data");
export const groupRef = collection(db, "group");

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const errorFormatter = (error) => {
  return toTitleCase(error.code.replaceAll("-", " ").split("auth/")[1]);
}

export async function signIn(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      return { user: user, error: null };
    }
  } catch (error) {
    return { user: null, error: errorFormatter(error) };
  }
}

export async function signUp(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      return { user: user, error: null }
    }
  } catch (error) {
    return { user: null, error: errorFormatter(error) }
  }
}

export function logout() {
  signOut(auth)
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsub;
  }, [])

  return currentUser;
}


