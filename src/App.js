import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import HomePage from "./pages/home.jsx";
import TheArtsPage from "./pages/theArts.jsx";
import BalancePage from "./pages/balance.jsx";
import AboutPage from "./pages/about.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/the-arts" element={<TheArtsPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
