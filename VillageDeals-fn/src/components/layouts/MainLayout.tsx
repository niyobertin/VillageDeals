import React from "react";
import { MainHeader } from "../common/navigator/MainHeader";
import { Footer } from "../common/navigator/Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-1 p-16">{children}</main>
      <Footer />
    </div>
  );
};
