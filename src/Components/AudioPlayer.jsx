import React, { useState, useEffect, useRef, createRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconPlay from '../static/play.png'
import IconPlay2 from '../static/sound_play.gif'
import Lottie, { useLottie } from 'lottie-react';


const AudioPlayer = ({ src, play, onPlay, onPlayCompleted }) => {
  const audioRef = useRef(null);


  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Speaker.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error fetching animation data:', error));
  }, []);

  useEffect(() => {
    console.log(src)
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  const handlePlayButton = () => {

    speakerAniRef.current.goToAndPlay(0);
    audioRef.current.play();
    
    if (onPlay) {
      onPlay();
    }
  };

  const handlePauseButton = () => {
    audioRef.current.pause();
  };

  const onAudioEnded = ()=> {
     if (onPlayCompleted) {
      onPlayCompleted ();
     }
  }

  const speakerAniRef = useRef();


  return (
    <div>
      <audio id="audio-player" ref={audioRef} src={src} controls className='audio-player-test' onEnded={onAudioEnded}>
        Your browser does not support the audio element.
      </audio>
      {/* <button id="audio-play-button" onClick={handlePlayButton}>Play Audio</button> */}
      <button style={{ width: '150px' }} onClick={handlePlayButton}>
        <Lottie lottieRef={speakerAniRef}
          animationData={animationData} // Provide your animation JSON data here
          loop={false}
          autoplay={false}

        />
      </button>
      {/* <IconButton id="audio-play-button" onClick={handlePlayButton}>
        <div>
          <img src={IconPlay2} alt="Your Image" style={{ width: '20%', height: '20%' }}/>
          <Typography variant="body2" color="textSecondary">
            Play
          </Typography>
        </div>
      </IconButton> */}
      <button id="audio-pause-button" style={{ display: 'none' }} onClick={handlePauseButton}>Pause Audio</button>
    </div>
  );
};

export default AudioPlayer;

{/* <a href="https://www.flaticon.com/free-icons/video" title="video icons">Video icons created by Bingge Liu - Flaticon</a> */ }
