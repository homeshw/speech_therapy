import React, { useState, useEffect } from 'react';
import Tests from './Tests';
import RecordPage from './Record';
import MainPage from './Main';
import NavBar from './NavBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar></NavBar>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

