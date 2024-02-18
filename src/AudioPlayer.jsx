import React, { useEffect, useRef } from 'react';

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

  return (
    <div>
      <audio id="audio-player" ref={audioRef} src={src} controls>
        Your browser does not support the audio element.
      </audio>
      {/* <button onClick={handlePlayButton}>Play Audio</button> */}
    </div>
  );
};

export default AudioPlayer;
