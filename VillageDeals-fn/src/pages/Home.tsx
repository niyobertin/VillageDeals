import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { HeroSection } from "../components/landing/HeroSection";
import WorkWithUs from "../components/landing/WorkWithUs";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="">
        <HeroSection />
        <WorkWithUs />
      </div>
    </MainLayout>
  );
};

export default Home;
