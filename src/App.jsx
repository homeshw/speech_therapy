import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import WordSelector from './WordSelector';
import word1 from './audio_clips/word1.mp3';
import word2 from './audio_clips/word2.mp3';
import word3 from './audio_clips/word3.mp3';

const App = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentClip, setCurrentClip] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const audioClips = [
    { src: word1, correctWord: 'Word1' },
    { src: word2, correctWord: 'Word2' },
    { src: word3, correctWord: 'Word3' }
  ];
  const words = ['Word1', 'Word2', 'Word3'];

  const selectRandomClip = () => {
    const randomIndex = Math.floor(Math.random() * audioClips.length);
    return audioClips[randomIndex];
  };

  useEffect(() => {
    setCurrentClip(selectRandomClip());
  }, []);

  const handleWordSelect = word => {
    setSelectedWord(word);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentClip(selectRandomClip());
  };

  const handlePlayButton = () => {
    setPlayAudio(true);
  };

  return (
    <div>
      <AudioPlayer src={currentClip.src} />
      <button onClick={handlePlayButton}>Play Audio</button>
      <WordSelector words={words} onSelect={handleWordSelect} />
      {showPopup && (
        <div className="popup">
          {selectedWord === currentClip.correctWord ? 'Correct!' : 'Incorrect!'}
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>

    
  );
};

export default App;

