import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

function RecordPage() {

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);

    const [fileName, setFileName] = useState('');

    const [showPopup, setShowPopup] = useState(false);

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const serverPort = 5001;

    const recorderControls = useAudioRecorder()

    useEffect(() => {
    }, [refresh])

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
        setShowPopup(true)
    };

    const handleFileUpload = async (f) => {

        if (fileName == '' || fileName == null) {
            alert('empty file name');
            return;
        }
        try {
            alert(JSON.stringify(fileName));
            //return;
            const audioBlob = await fetch(url).then((r) => r.blob());
            const audioFile = new File([audioBlob], fileName + '.wav', { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioFile);
            formData.append('word', fileName)

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

        handleClosePopup();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        handleClose();
        setRefresh(!refresh);
    };

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                //onRecordingComplete={(blob) => handleFileChange(blob)}
                recorderControls={recorderControls}
            />


            {showPopup && (
                <div className="popup">

                    <Modal open={true} onClose={handleClose}>

                        <Box sx={style}>
                            <audio controls>
                                <source src={url} type="audio/mpeg" />
                                Your browser does not support the audio tag.
                            </audio>

                            <TextField id="label" label="File Name" variant="outlined" onChange={(e) => setFileName(e.target.value)} />
                            <Box>
                                <Button onClick={handleFileUpload}>Save Recording</Button>
                                <Button onClick={handleClosePopup}>Close Without Saving</Button>
                            </Box>
                        </Box>

                    </Modal>
                    {open}

                </div>
            )}
        </div>

    )

}

export default RecordPage;



