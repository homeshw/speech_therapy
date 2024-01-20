import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useState } from 'react';
import axios from 'axios';

function RecordPage() {

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);

    const serverPort = 5001;

    const recorderControls = useAudioRecorder()
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
        setUrl(url)
    };

    const saveRecording = (blob) => {
        const audiofile = new File([blob], "audiofile.mp3", {
            type: "audio/mpeg",
        });
        handleFileUpload(audiofile)
        setFile(audiofile)

        // const url = URL.createObjectURL(blob);
        // const audio = document.createElement("audio");
        // audio.src = url;
        // audio.controls = true;
        // document.body.appendChild(audio);
    };

    const handleFileChange = (blob) => {
        //setFile(e.target.files[0]);
        if (blob){
            saveRecording(blob)
            const audiofile = new File([blob], "audiofile.mp3", {
                type: "audio/mpeg",
            });
            setFile(audiofile)
        }
        
    };

    const handleFileUpload = async (f) => {
        try {
            const audioBlob = await fetch(url).then((r) => r.blob());
            const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioFile);

            // Replace 'http://localhost:5000/upload' with your server endpoint
            await axios.post('http://localhost:' + serverPort + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFile(null)

            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                //onRecordingComplete={(blob) => handleFileChange(blob)}
                recorderControls={recorderControls}
            />
            <button onClick={recorderControls.stopRecording}>Stop recording</button>

            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>


    )

}

export default RecordPage;



