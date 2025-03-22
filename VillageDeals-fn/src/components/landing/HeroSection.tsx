import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <div className="relative text-start px-6 z-10 pl-20 pr-20">
        <h1 className="sm:text-5xl text-2xl font-bold mb-4">
          Don't Limit Your Business to Paper
        </h1>
        <p className="text-2xl mx-auto">
          The future of business is digital. Embrace technology, scale beyond
          borders, and unlock endless growth opportunities. Your success starts
          here!
        </p>
        <Link
          to="/register-shop"
          className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
        >
          Join us now
        </Link>
      </div>
    </div>
  );
};
