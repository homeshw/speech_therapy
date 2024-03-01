import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import AudioGrid from './AudioGrid';

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
    const [newTestName, setNewTestName] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [showCreateTestPopup, setShowCreateTestPopup] = useState(false);

    const [testArray, setTestArray] = useState(null);
    const [selectedRows, setSelectedRows] = useState(null);

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedRowIds, setSelectedRowIds] = useState([]);

    // Access the API endpoint
    const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

    const recorderControls = useAudioRecorder()

    useEffect(() => {
    }, [refresh])

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            fetchArray();
        }
        return () => effectRan.current = true;
    }, [refresh]);

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
        setShowPopup(true)
    };

    const fetchArray = async () => {
        try {
            const response = await axios.get(apiEndpoint + '/api/get/allwords');
            console.log('fetch all words')
            console.log(response['data'])
            setTestArray(response['data'])
        } catch (error) {
            console.error('Error fetching audio: ', error);
        }
    }

    const handleFileUpload = async (f) => {

        if (fileName == '' || fileName == null) {
            alert('empty file name');
            return;
        }
        try {

            let fileNameUnicodeRep = ''; // Unicode representation of the file name
            for (let i = 0; i < fileName.length; i++) {
                fileNameUnicodeRep = fileNameUnicodeRep + fileName.charCodeAt(i);
            }
            console.log(fileNameUnicodeRep);

            const audioBlob = await fetch(url).then((r) => r.blob());
            const audioFile = new File([audioBlob], fileNameUnicodeRep + '.wav', { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioFile);
            formData.append('word', fileName);

            await axios.post(apiEndpoint + '/api/upload/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFile(null)

            alert('File uploaded successfully!');
        } catch (error) {
            alert('Error uploading file:', error);
        }

        handleClosePopup();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        handleClose();
        setRefresh(!refresh);
    };

    const createNewTest = () => {
        setShowCreateTestPopup(true);
    }

    const handleCreateNewTestConfirmation = async () => {
        //alert(newTestName + 'created');
        console.log(selectedRows);
        handleCloseNewTestPopup();
        try {
            if (selectedRows) {
                const TestBody = { 'name': newTestName, 'ids': selectedRowIds };
                await axios.post(apiEndpoint + '/api/upload/test', TestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(alert(newTestName + ' created'));

            }
        } catch (error) {
            // Check if the error is a validation error
            if (error.response && error.response.status === 422) {
                // Set the validation error message
                alert('Duplicate test name found! Please choose another name.');
            } else {
                // Handle other errors
                console.error('An error occurred:', error.message);
            }

        }


    }

    const handleCloseNewTestPopup = () => {
        setShowCreateTestPopup(false);

    }

    const handleRowSelect = (rows) => {

        if (testArray) {
            setSelectedRows(testArray.filter(obj => rows.includes(obj.id)))
            setSelectedRowIds(rows);
        }
        // setSelectedRowIds(selectedRowIds);
    };

    const handleCreateNewPopupError = (message) => {

        handleCloseNewTestPopup();
        alert(message);
    };

    return (
        <>
            <div><AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                //onRecordingComplete={(blob) => handleFileChange(blob)}
                recorderControls={recorderControls}
            /></div>

            {
                testArray && testArray != undefined && testArray.length > 0 ? (
                    <div>
                        {/* {testArray.map(test => <div>{test.word}</div>)} */}
                        <AudioGrid rows={testArray} onRowSelect={handleRowSelect} ></AudioGrid>
                    </div>
                )
                    :
                    <div></div>
            }
            <div><Button className='' variant="outlined" onClick={createNewTest}>Select Words and Create A Test</Button></div>


            {showPopup && (
                <div className="popup">

                    <Modal open={true} onClose={handleClose}>

                        <Box sx={style}>
                            <audio controls>
                                <source src={url} type="audio/mpeg" />
                                Your browser does not support the audio tag.
                            </audio>

                            <TextField id="label" label="File Name" variant="outlined" onChange={(e) => setFileName(e.target.value)} />
                            <div className="record-popup-button-container">
                                <Button className='popup-button' variant="contained" onClick={handleFileUpload}>Save Recording</Button>
                                <Button className='popup-button' variant="outlined" onClick={handleClosePopup}>Cancel Saving</Button>
                            </div>
                        </Box>

                    </Modal>
                    {open}

                </div>
            )}

            {showCreateTestPopup && (selectedRows && selectedRows.length > 0 ?
                (
                    <div className="popup">

                        <Modal open={true} onClose={handleClose}>

                            <Box sx={style}>

                                Do you want to create a test with following words?
                                <div>
                                    {selectedRows ? selectedRows.map(obj => obj.word).join(', ') : ''}
                                </div>


                                <TextField id="label" label="Test Name" variant="outlined" onChange={(e) => setNewTestName(e.target.value)} />
                                <div className="record-popup-button-container">
                                    <Button className='popup-button' variant="contained" onClick={handleCreateNewTestConfirmation}>Create New Test</Button>
                                    <Button className='popup-button' variant="outlined" onClick={handleCloseNewTestPopup}>Cancel Saving</Button>
                                </div>
                            </Box>

                        </Modal>
                        {open}

                    </div>
                )
                :
                handleCreateNewPopupError('please select some words first'))}
        </>

    )

}

export default RecordPage;



