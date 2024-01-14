import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import WordSelector from './WordSelector';
import Test1 from './Test1';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import word1 from './audio_clips/word1.mp3';
import word2 from './audio_clips/word2.mp3';
import word3 from './audio_clips/word3.mp3';
import RecordPage from './Record';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
}
export default App;

