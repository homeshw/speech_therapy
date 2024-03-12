import React, { useEffect, useRef } from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconPlay from '../static/play.png'
import IconPlay2 from '../static/sound_play.gif'

const AudioPlayer = ({ src, play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    console.log(src)
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  const handlePlayButton = () => {
    audioRef.current.play();
  };

  const handlePauseButton = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <audio id="audio-player" ref={audioRef} src={src} controls className='audio-player-test'>
        Your browser does not support the audio element.
      </audio>
      {/* <button id="audio-play-button" onClick={handlePlayButton}>Play Audio</button> */}
      <IconButton id="audio-play-button" onClick={handlePlayButton}>
        <div>
          <img src={IconPlay2} alt="Your Image" style={{ width: '20%', height: '20%' }}/>
          <Typography variant="body2" color="textSecondary">
            Play
          </Typography>
        </div>
      </IconButton>
      <button id="audio-pause-button" style={{ display: 'none' }} onClick={handlePauseButton}>Pause Audio</button>
    </div>
  );
};

export default AudioPlayer;

{/* <a href="https://www.flaticon.com/free-icons/video" title="video icons">Video icons created by Bingge Liu - Flaticon</a> */ }
