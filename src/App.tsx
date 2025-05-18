import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HeartCursor from './components/HeartCursor';
import MusicPlayer from './components/MusicPlayer';
import Welcome from './sections/Welcome';
import Memories from './sections/Memories';
import LoveReasons from './sections/LoveReasons';
import EverythingSection from './sections/EverythingSection';
import ThankYou from './sections/ThankYou';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/reasons" element={<LoveReasons />} />
        <Route path="/everything" element={<EverythingSection />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="App relative">
        <HeartCursor />
        <MusicPlayer />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;