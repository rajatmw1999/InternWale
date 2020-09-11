import React from "react";
import HeroSection from "./Components/HeroSection";
import RapidHeroContent from "./Components/RapidHeroContent";
import JobCard from "./Components/JobCard";
import "./StyleSheet/style.css";

export default function App() {
  return (
    <>
      <HeroSection />
      <RapidHeroContent />
      <JobCard />
    </>
  );
}
