import FoodCarousel from "./components/FoodCarousel/FoodCarousel";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import RestaurantSection from "./components/RestaurantSection/RestaurantSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <HeroSection />
        <FoodCarousel />
        <RestaurantSection />
      </div>

    </div>
  );
}
