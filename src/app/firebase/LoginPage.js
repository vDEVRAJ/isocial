'use client';
import React, { useState, useEffect } from 'react';
import { signInWithGoogle, logout, monitorAuthState } from './auth';

export default function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    monitorAuthState(setUser);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <>
          <p className="mb-4">Welcome, {user.displayName}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
