import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src, play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <div>
      <audio ref={audioRef} src={src} controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
