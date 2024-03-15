import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from '../Components/AudioPlayer';
import WordSelector from '../Components/WordSelector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';

import TestSelector from '../Components/TestSelector';

function Tests() {
  //const [selectedWord, setSelectedWord] = useState(null);
  const [currentClip, setCurrentClip] = useState({});
  const [message, setMessage] = useState({});
  const [showImmediateResultPopup, setShowImmediateResultPopup] = useState(false);
  const [showStartNewPopup, setShowStartNewPopup] = useState(false);
  //const [playAudio, setPlayAudio] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [clipToggle, setClipToggle] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tryWord, setTryWord] = useState(true);

  // Access the API endpoint
  const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

  const initLength = window.config.REACT_APP_TEST1_LENGTH;

  const [testLength, setTestLength] = useState(initLength);

  const [correctLength, setCorrectLength] = useState(0);

  const [testName, setTestName] = React.useState('');

  //const testToggle = false;

  //console.log(window.config.REACT_APP_API_ENDPOINT);

  console.log(apiEndpoint)

  const [audioUrl, setAudioUrl] = useState('');

  const [testArray, setTestArray] = useState(null);

  const [testList, setTestList] = useState(null);

  const [selectedTestId, setSelectedTestId] = useState('');


  //let audioRef = useRef(null);

  const selectRandomClip = () => {
    const randomIndex = Math.floor(Math.random() * testArray.length);
    const x = testArray[randomIndex]
    setCurrentClip(x)
  };

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== "development") {
      //fetchArray();
      fetchTestList();
    }
    return () => effectRan.current = true;
  }, []);

  useEffect(() => {
    fetchArray();
  }, [selectedTestId])

  useEffect(() => {
    if (testArray != null && testArray.length > 0) {
      selectRandomClip()
    }
  }, [testArray, clipToggle])


  useEffect(() => {
    if (Object.keys(currentClip).length > 0) {
      console.log(currentClip.src)
      setAudioUrl(apiEndpoint + '/api/get/audio/' + currentClip.src)
    }
  }, [currentClip])

  useEffect(() => {
    if (testLength == 0) {
      setTryWord(true);
      console.log(tryWord);

      sendTestResult().then(alert('Test Result: ' + correctLength + '/' + initLength));

      setShowStartNewPopup(true);
    }
  }, [testLength])

  const handleWordSelect = async word => {

    if (tryWord) {
      if (testArray != null && testArray.length > 0) {

        let selObj = testArray.find(item => item.word === word)
        setAudioUrl(apiEndpoint + '/api/get/audio/' + selObj.src)

        const audioPlayElement = document.getElementById('audio-play-button');

        const audioPauseElement = document.getElementById('audio-play-button');

        const audioElement = document.getElementById('audio-player');

        if (audioPlayElement && audioPauseElement) {

          // console.log(audioElement.currentTime)
          // console.log(audioElement.paused)
          // console.log(audioElement.ended)
          //console.log('ready state')
          //console.log(audioElement.readyState)
          // console.log(audioElement.HAVE_CURRENT_DATA)

          //console.log(audioPlayElement.currentTime)

          try {
            setTimeout(() => {
              //audioPauseElement.click()
              audioPlayElement.click();
              console.log(audioElement.readyState)
            }, 2000);
          }
          catch (error) {
            console.error('Failed to play audio: ' + error)
          }

        }

      }
    }
    else {
      //setSelectedWord(word);
      if (word == currentClip.word) {
        setMessage('Correct!')
        setCorrectLength(correctLength + 1)
      }
      else {
        setMessage('Incorrect!')
        const correctButton = document.getElementById(currentClip.word);
        if (correctButton) {
          correctButton.style.backgroundColor = '#F6958E'
          setTimeout(() => {
            correctButton.style.backgroundColor = '';
          }, 1000);
        }
      }
      setShowImmediateResultPopup(true);
    }
  };

  const handleCloseImmediateResultPopup = () => {
    setShowImmediateResultPopup(false);
    handleClose();
    setTestLength(testLength - 1);
    setClipToggle(!clipToggle);

  };

  const fetchArray = async () => {
    if (selectedTestId) {
      try {
        const response = await axios.get(apiEndpoint + '/api/get/testarray?testid=' + selectedTestId);
        console.log('fetch test array')
        console.log(response['data'])
        setTestArray(response['data'])
      } catch (error) {
        console.error('Error fetching test data: ', error);
      }
    }
  }

  //:TODO
  const fetchTestList = async () => {
    try {
      const response = await axios.get(apiEndpoint + '/api/get/testlist');
      console.log('fetch test list')
      console.log(response['data'])
      setTestList(response['data'])
    } catch (error) {
      console.error('Error fetching test list: ', error);
    }
  }

  const startNew = () => {

    setShowStartNewPopup(true);

  }

  const handleStartnewPopup = () => {

    setTryWord(false);
    setTestLength(initLength);
    setCorrectLength(0);
    handleStartnewClosePopup();

  }

  const handleStartnewClosePopup = () => {

    setShowStartNewPopup(false);
    handleClose();

  }

  const handleTestSelectionChange = (event) => {
    setTestName(event.target.value);
  };

  const sendTestResult = async () => {
    const TestBody = { 'testId': selectedTestId, 'correct': correctLength, 'total': initLength };
    console.log(TestBody);
    await axios.post(apiEndpoint + '/api/upload/testresult', TestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }


  return (
    <>

      {testList && (<TestSelector testList={testList} propSetSelectedTestId={setSelectedTestId}></TestSelector>)}

      <div className='start-new-button'><Button id='start-new' key='Start New Test' variant='outlined' onClick={() => startNew()}>Start New
      </Button></div>

      {tryWord ? (
        <div className="audio-player" style={{ display: 'none' }}><AudioPlayer src={audioUrl} play={false} /></div>
      ) : (
        <div className="audio-player"><AudioPlayer src={audioUrl} play={false} /></div>
      )}

      {testArray && (
        <WordSelector words={testArray} onSelect={handleWordSelect} />
      )}

      {showImmediateResultPopup && (
        <div className="popup">

          <Modal
            open={true}
            onClose={handleCloseImmediateResultPopup}
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

              <Button variant='outlined' onClick={handleCloseImmediateResultPopup}>Close</Button>

            </Box>

          </Modal>
          {open}

        </div>
      )}

      {showStartNewPopup && (
        <div className="popup">

          <Modal
            open={true}
            onClose={handleStartnewClosePopup}
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
              <div>Do you want to start new?
              </div>
              <div className='start-new-popup'>
                <Button variant='outlined' onClick={handleStartnewPopup}>Start New</Button>
                <Button variant='outlined' onClick={handleStartnewClosePopup}>Cancel</Button>
              </div>
            </Box>

          </Modal>
          {open}

        </div>

      )}

    </>

  );
};

export default Tests;