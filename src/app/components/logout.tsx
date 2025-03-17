"use client";
import React from "react";




export default function Logout() {

   const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logout successful");
        window.location.href = "/auth/login";
    }

    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-green-200">
                <h1 className="text-xl font-bold">Welcome To Task Manager</h1>
                <button
                    className="bg-blue-500 text-white p-2 "
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )

}