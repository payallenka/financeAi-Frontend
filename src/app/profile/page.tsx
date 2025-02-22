"use client";

import { useEffect, useState } from "react";
import { onAuthStateChange, logOut } from "../firebase";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push("/"); // Redirect to home if not logged in
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <img src={user.photoURL ? user.photoURL.replace("s96-c", "s400-c") : "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <p className="text-lg font-semibold">{user.displayName}</p>
      <p className="text-gray-600">{user.email}</p>
      <button onClick={logOut} className="mt-6 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-700">
        Logout
      </button>
    </div>
  );
}
