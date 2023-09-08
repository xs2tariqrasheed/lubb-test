/* eslint-disable @next/next/no-html-link-for-pages */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, signInWithEmailAndPassword } from "@/config/firebase";
import Button from "@/components/button";

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in successfully");
      router.replace("/home");
    } catch (error: any) {
      console.error("Login error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      if (response?.user) {
        console.log("User signed in with Google");
        router.replace("/home");
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-gray-700 font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border text-gray-600 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border text-gray-600 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <Button loading={isLoading}>Login</Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Or sign in with</p>
          <div className="mt-2">
            {/* Google sign-in button */}
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Do not have an account?{" "}
            <a href="/sign-up" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
