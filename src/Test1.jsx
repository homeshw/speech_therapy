import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from './AudioPlayer';
import WordSelector from './WordSelector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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

function Test1() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentClip, setCurrentClip] = useState({});
  const [message, setMessage] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [clipToggle, setClipToggle] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [audioUrl, setAudioUrl] = useState('');

  const [testArray, setTestArray] = useState(null);

  const serverPort = 5001;

  const selectRandomClip = () => {
    const randomIndex = Math.floor(Math.random() * testArray.length);
    const x = testArray[randomIndex]
    setCurrentClip(x)
  };

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== "development") {
      fetchArray();
    }
    return () => effectRan.current = true;
  }, []);

  useEffect(() => {
    if (testArray) {
      selectRandomClip()
    }
  }, [testArray, clipToggle])

  useEffect(() => {
    if (Object.keys(currentClip).length > 0) {
      console.log(currentClip.src)
      setAudioUrl('http://localhost:' + serverPort + '/get/audio/' + currentClip.src)
    }
  }, [currentClip])

  const handleWordSelect = word => {
    setSelectedWord(word);
    word === currentClip.word ? setMessage('Correct!') : setMessage('Incorrect!')
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    handleClose();
    setClipToggle(!clipToggle);
  };

  const fetchAudio = async () => {
    console.log("fetching audio")
    try {
      console.log('current clip obj: ')
      console.log(currentClip)
      const response = await axios.get('http://localhost:' + serverPort + '/get/audio/' + currentClip.src)
    } catch (error) {
      console.error('Error fetching audio: ', error);
    }
  }

  const fetchArray = async () => {
    try {
      const response = await axios.get('http://localhost:' + serverPort + '/get/testarray');
      console.log('fetch test array')
      console.log(response['data'])
      setTestArray(response['data'])
    } catch (error) {
      console.error('Error fetching audio: ', error);
    }
  }

  return (
    <div>
      <AudioPlayer src={audioUrl} />
      {testArray && (
        <WordSelector words={testArray} onSelect={handleWordSelect} />
      )}
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

export default Test1;