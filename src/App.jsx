import React, {  } from 'react';
import Tests from './Pages/Tests';
import RecordPage from './Pages/Record';
import Dashboard from './Pages/Dashboard';
import MainPage from './Pages/Main';
import NavBar from './Components/NavBar';

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

