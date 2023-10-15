import React from "react";
import "./Home.css";
import MainSection from "./MainSection";
import SearchSection from "./SearchSection";

export default function Home() {
  return (
    <div className="home-page">
      <SearchSection />
      <MainSection />
    </div>
  );
}
