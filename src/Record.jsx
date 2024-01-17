import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useState } from 'react';
import axios from 'axios';

function RecordPage() {

    const [file, setFile] = useState(null);

    const serverPort = 5001;

    const recorderControls = useAudioRecorder()
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

    const saveRecording = (blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'recorded_audio.mp3';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace 'http://localhost:5000/upload' with your server endpoint
            await axios.post('http://localhost:' + serverPort + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <AudioRecorder
                // onRecordingComplete={(blob) => addAudioElement(blob)}
                onRecordingComplete={(blob) => saveRecording(blob)}
                recorderControls={recorderControls}
            />
            <button onClick={recorderControls.stopRecording}>Stop recording</button>

            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>


    )

}

export default RecordPage;



