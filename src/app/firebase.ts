import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRx87171V_YnXg8f2OnJLuedVZb9yqKHI",
  authDomain: "financeai-dfe7c.firebaseapp.com",
  projectId: "financeai-dfe7c",
  storageBucket: "financeai-dfe7c.appspot.com",
  messagingSenderId: "471872749703",
  appId: "1:471872749703:web:1b36ba99ed08116c0db822",
  measurementId: "G-LMMSN8TTL9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let isSigningIn = false; // Prevent multiple sign-in popups

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  if (isSigningIn) return null; // Prevent multiple requests
  isSigningIn = true;

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user.photoURL)

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }
    }

    return user;
  } catch (error: any) {
    if (error.code === "auth/cancelled-popup-request") {
      console.warn("Sign-in popup was canceled due to multiple requests.");
    } else if (error.code === "auth/popup-closed-by-user") {
      console.info("User closed the sign-in popup. No action needed.");
    } else {
      console.error("Google sign-in failed:", error.message);
    }
    return null;
  } finally {
    isSigningIn = false;
  }
};

// Logout function
export const logOut = async () => {
  await signOut(auth);
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};