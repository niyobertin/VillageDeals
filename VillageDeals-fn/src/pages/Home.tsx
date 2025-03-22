import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { HeroSection } from "../components/landing/HeroSection";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="">
        <HeroSection />
        <div className="bg-gray-300"></div>
      </div>
    </MainLayout>
  );
};

export default Home;
