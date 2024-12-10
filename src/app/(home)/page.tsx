"use client"
import useSetLocation from "@/hooks/useSetLocation";
import FoodCarousel from "./components/FoodCarousel/FoodCarousel";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import { QuickCuisine } from "./components/QuickCuisine/QuickCuisine";
import RestaurantSection from "./components/RestaurantSection/RestaurantSection";

export default function Home() {
  useSetLocation();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">

      <Navbar />
      <div className="container mx-auto">
        <HeroSection />
        {/* <FoodCarousel /> */}
        <QuickCuisine />
        <RestaurantSection />
      </div>

    </div>
  );
}
