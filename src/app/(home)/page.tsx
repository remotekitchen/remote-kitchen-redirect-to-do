import FoodCarousel from "./components/FoodCarousel/FoodCarousel";
import HeroSection from "./components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className="container">
      <HeroSection />
      <FoodCarousel />
    </div>
  );
}
