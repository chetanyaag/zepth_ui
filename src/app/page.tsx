// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Login from "./components/loginForm";
// import Tasks from "./components/tasks";

import HomeComp from "./components/homeComp";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8080/api";

export default function Home() {



  return (
    <>
    <HomeComp />
    </>
  );
}
