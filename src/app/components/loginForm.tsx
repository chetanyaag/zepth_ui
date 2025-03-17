"use client"
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8080/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      window.location.href = "/tasks";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
      alert("Login failed");
    }
    }
  };

  const handleRegister = async () => {
    window.location.href = "/auth/register";
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      
      <h1 className="text-xl font-bold">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full my-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full my-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-1/2">
        Login
      </button>
      <button onClick={handleRegister} className="bg-green-500 text-white p-2 w-1/2">
        Register
      </button>
    </div>
  );
}
