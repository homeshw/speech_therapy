import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from './AudioPlayer';
import WordSelector from './WordSelector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import './App.css';

function Test1() {
  //const [selectedWord, setSelectedWord] = useState(null);
  const [currentClip, setCurrentClip] = useState({});
  const [message, setMessage] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  //const [playAudio, setPlayAudio] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [clipToggle, setClipToggle] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tryWord, setTryWord] = useState(false);

  // Access the API endpoint
  const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

  //const testToggle = false;

  //console.log(window.config.REACT_APP_API_ENDPOINT);

  console.log(apiEndpoint)

  const [audioUrl, setAudioUrl] = useState('');

  const [testArray, setTestArray] = useState(null);

  const audioRef = useRef(null);

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
      setAudioUrl(apiEndpoint + '/api/get/audio/' + currentClip.src)
    }
  }, [currentClip])

  // useEffect(() => {
  //   if(testToggle) {

      
  //     setPlayAudio(true)
  //     console.log(playAudio)
  //   }
  //   else {
  //     setPlayAudio(false)
  //   }

  // }, [audioUrl])

  const handleWordSelect = async word => {

    if(tryWord) {
      if(testArray.length > 0) {

        let selObj = testArray.find(item => item.word === word)
        setAudioUrl(apiEndpoint + '/api/get/audio/' + selObj.src)

        const audioElement = document.getElementById('audio-player');

      if(audioElement) {

        // console.log(audioElement.currentTime)
        // console.log(audioElement.paused)
        // console.log(audioElement.ended)
        // console.log(audioElement.readyState)
        // console.log(audioElement.HAVE_CURRENT_DATA)
        audioElement.pause() // no apperent effect
        
        console.log(audioElement.currentTime)
        audioElement.play().catch(error => {
          // todo: find a permenent solution
          audioElement.play();
          console.error('Failed to play audio: ' + error)
        });
      }

      }
    }
    else {
      //setSelectedWord(word);
      word === currentClip.word ? setMessage('Correct!') : setMessage('Incorrect!')
      setShowPopup(true);
    }
    
    
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    handleClose();
    setClipToggle(!clipToggle);
  };

  // const fetchAudio = async () => {
  //   console.log("fetching audio")
  //   try {
  //     console.log('current clip obj: ')
  //     console.log(currentClip)
  //     const response = await axios.get(apiEndpoint + '/api/get/audio/' + currentClip.src)
  //   } catch (error) {
  //     console.error('Error fetching audio: ', error);
  //   }
  // }

  const fetchArray = async () => {
    try {
      const response = await axios.get(apiEndpoint + '/api/get/testarray');
      console.log('fetch test array')
      console.log(response['data'])
      setTestArray(response['data'])
    } catch (error) {
      console.error('Error fetching audio: ', error);
    }
  }

  return (
    <>
    <FormGroup>
      <FormControlLabel control={<Switch checked={tryWord} onChange={ (e) => setTryWord(e.target.checked)}/>} label="try!" />
    </FormGroup>

      <div className="audio-player"><AudioPlayer ref={audioRef} src={audioUrl} play={false} /></div>
      
      {testArray && (
        <WordSelector words={testArray} onSelect={handleWordSelect} />
      )}
      {showPopup && (
        <div className="popup">

          <Modal
            open={true}
            onClose={handleClose}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              <div>{message}
              </div>

              <Button onClick={handleClosePopup}>Close</Button>

            </Box>

          </Modal>
          {open}

        </div>
      )}
    </>


  );
};

export default Test1;