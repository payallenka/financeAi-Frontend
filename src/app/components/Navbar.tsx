"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithGoogle, logOut, onAuthStateChange } from "../firebase";
import { User } from "firebase/auth";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const handleProtectedNavigation = async (path: string) => {
    if (user) {
      router.push(path);
    } else {
      alert("You need to sign in first!");
      await handleSignIn();
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">FinanceAI</Link>
        </div>

        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <button 
              onClick={() => handleProtectedNavigation("/transactions")} 
              className="hover:underline"
              
            >
              Transactions
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleProtectedNavigation("/finance-visualization")} 
              className="hover:underline"
              
            >
              Visualization
            </button>
          </li>
        </ul>

        <div className="hidden md:flex items-center">
          {user ? (
            <>
              <Link href="/profile" className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
              <img 
                src={user.photoURL ? user.photoURL.replace("s96-c", "s400-c") : "/default-avatar.png"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full" 
              />

                <span>{user.displayName}</span>
              </Link>
              <button onClick={logOut} className="ml-4 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={handleSignIn} 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
