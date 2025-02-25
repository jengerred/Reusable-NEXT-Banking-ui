// src/app/page.tsx
"use client";
import Dashboard from "./components/Dashboard";
//import dynamic from "next/dynamic";

// If you need to load Dashboard dynamically
//const Dashboard = dynamic(() => import("./components/Dashboard"));

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
