

"use client";
import React, {  useEffect } from "react";



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8080/api";


// check for the token in local storage
// if it exists, redirect to the tasks page
// if it doesn't exist, redirect to the login form


export default function HomeComp() {

    useEffect(() => { 
    const token = localStorage.getItem("token");
    if(token){
      window.location.href = "/tasks";}
      else{
        window.location.href = "/auth/login";
      }
    }, []);



  return (
    <>
    <h1>Redirecting...</h1>
    </>
  );
}
