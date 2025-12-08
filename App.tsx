import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/src/pages/Home';
import WishPage from '@/src/pages/WishPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;