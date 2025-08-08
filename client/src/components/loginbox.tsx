import React, { useState } from "react";
import { auth } from "../firebase";
import {
  AuthErrorCodes,
  signInWithEmailAndPassword,
  type AuthError,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export function Loginbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auth is now configured in firebase.ts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Call API
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      showLoginError(error as AuthError);
      console.log(error);
    }
  };

  const showLoginError = (error: AuthError) => {
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      setError("Wrong password");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-90 rounded-xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600 text-sm text-center p-2 bg-red-100 rounded-md">{error}</div>}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="text-sm text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Loginbox;
