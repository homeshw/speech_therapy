import React, { useState, useEffect } from 'react';
import Test1 from './Test1';
import RecordPage from './Record';
import MainPage from './Main';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
}
export default App;

