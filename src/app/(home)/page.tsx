"use client"
import { useState } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import { QuickCuisine } from "./components/QuickCuisine/QuickCuisine";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <HeroSection
          loading={loading}
          setLoading={setLoading}
        />
        <QuickCuisine />
        <RestaurantsList
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}
