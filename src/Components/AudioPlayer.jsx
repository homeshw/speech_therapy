import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';


const AudioPlayer = ({ src, play, onPlay }) => {

  const speakerAniRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Speaker.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error fetching animation data:', error));
  }, []);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    // Check if the sound is already playing, stop it if so
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
    // Play the sound
    audio.play();
    setIsPlaying(true);
  };

  const handlePlayButton = () => {

    playSound(src);
    speakerAniRef.current.goToAndPlay(0);
    //audioRef.current.play();

    if (onPlay) {
      onPlay();
    }
  };

  const handlePauseButton = () => {
    //audioRef.current.pause();
  };

  


  return (
    <div>
      {/* <audio id="audio-player" ref={audioRef} src={src} controls className='audio-player-test' onEnded={onAudioEnded}>
        Your browser does not support the audio element.
      </audio> */}
      {/* <button id="audio-play-button" onClick={handlePlayButton}>Play Audio</button> */}
      <button className='default-button' style={{ width: '150px' }} onClick={handlePlayButton}>
        <Lottie lottieRef={speakerAniRef}
          animationData={animationData} // Provide your animation JSON data here
          loop={false}
          autoplay={false}

        />
      </button>
      <button id="audio-pause-button" style={{ display: 'none' }} onClick={handlePauseButton}>Pause Audio</button>
    </div>
  );
};

export default AudioPlayer;

{/* <a href="https://www.flaticon.com/free-icons/video" title="video icons">Video icons created by Bingge Liu - Flaticon</a> */ }
