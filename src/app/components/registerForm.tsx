"use client"
import React, { useState } from "react";
import axios from "axios";
import { json } from "stream/consumers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8080/api";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");



  const handleRegistration = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, JSON.stringify({ username, email, password }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert(response.data.message);
        window.location.href = "/auth/login";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed");
      }
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      
    <h1 className="text-xl font-bold">Register User</h1>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="border p-2 w-full my-2"
    />

      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full my-2" />
      <input
      type="password"
      value={password} className="border p-2 w-full my-2" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  />
      <button onClick={handleRegistration} className="bg-blue-500 text-white p-2 w-full">
        Register
      </button>



    </div>
  );
}
