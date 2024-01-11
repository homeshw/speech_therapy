import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import WordSelector from './WordSelector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import word1 from './audio_clips/word1.mp3';
import word2 from './audio_clips/word2.mp3';
import word3 from './audio_clips/word3.mp3';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentClip, setCurrentClip] = useState({});
  const [message, setMessage] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const audioClips = [
    { src: word1, correctWord: 'Word1' },
    { src: word2, correctWord: 'Word2' },
    { src: word3, correctWord: 'Word3' }
  ];
  const words = ['Word1', 'Word2', 'Word3'];

  const selectRandomClip = () => {
    const randomIndex = Math.floor(Math.random() * audioClips.length);
    console.log(randomIndex)
    return audioClips[randomIndex];
  };

  useEffect(() => {
    setCurrentClip(selectRandomClip());
  }, []);

  const handleWordSelect = word => {
    setSelectedWord(word);
    word === currentClip.correctWord ? setMessage('Correct!') : setMessage('Incorrect!')
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    handleClose();
    setCurrentClip(selectRandomClip());
  };


  return (
    <div>
      <AudioPlayer src={currentClip.src} />
      <WordSelector words={words} onSelect={handleWordSelect} />
      {showPopup && (
        <div className="popup">

          <Modal
            open={true}
            onClose={handleClose}
          >
            <Box sx={style}>
              <div>{message}
              </div>

              <Button onClick={handleClosePopup}>Close</Button>

            </Box>

          </Modal>
          {open}

        </div>
      )}
    </div>


  );
};

export default App;

