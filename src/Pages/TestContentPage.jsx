import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../Components/AudioPlayer";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import WordSelector from "../Components/WordSelector";
import correctSoundFile from '../static/sound/correct-ans.wav';
import wrongSoundFile from '../static/sound/wrong-ans.wav';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import Fade from 'react-bootstrap/Fade';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from "react-router-dom";

const AnswerStatus = {
    Null: 'Null',
    Correct: 'Correct',
    Incorrect: 'Incorrect'
}

function TestContentPage() {


    const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;
    const { id } = useParams();

    const [audioUrl, setAudioUrl] = useState('');
    const [testArray, setTestArray] = useState(null);
    const [currentClip, setCurrentClip] = useState({});
    const [message, setMessage] = useState("");

    const [isPlaying, setIsPlaying] = useState(false);
    const [open, setOpen] = useState(false);

    const [currentAnswerStatus, setCurrentAnswerStatus] = useState(AnswerStatus.Null);
    const [testCount , setTestCount] = useState(0);
    const [correctAnswerCount ,setCorrectAnswerCount] = useState(0);

    const navigate = useNavigate();

    const selectRandomClip = () => {
        const randomIndex = Math.floor(Math.random() * testArray.length);
        const x = testArray[randomIndex]
        setCurrentClip(x)
    };

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

    useEffect(() => {

        fetchArray();
        //setAudioUrl(apiEndpoint + '/api/get/audio/' + '116101115116.mp3');

    }, []);

    useEffect(() => {

        if (testArray != null)
            selectRandomClip();

    }, [testArray])

    useEffect(() => {

        if (Object.keys(currentClip).length > 0) {
            console.log(currentClip.src)
            setAudioUrl(apiEndpoint + '/api/get/audio/' + currentClip.src)
        }

    }, [currentClip])

    const fetchArray = async () => {
        if (id) {
            try {
                const response = await axios.get(apiEndpoint + '/api/get/testarray?testid=' + id);
                setTestArray(response['data'])
            } catch (error) {
                console.error('Error fetching test data: ', error);
            }
        }
    }

    const onAudioPlayCompleted = () => {

        selectRandomClip();
    }

    const handleWordSelection = (word) => {

        if (word == currentClip.word) {
            setMessage('Correct!')
            setCurrentAnswerStatus(AnswerStatus.Correct);
            playSound(correctSoundFile);
            setCorrectAnswerCount((count)=> count + 1);
        } else {
            setMessage('Wrong!')
            setCurrentAnswerStatus(AnswerStatus.Incorrect);
            playSound(wrongSoundFile);
        }

        setTestCount((count)=> count + 1);

        setOpen(true);

        setTimeout(() => {
            setOpen(false)
        }, 2000);
    }

    useEffect(()=> {

        if (testCount == window.config.REACT_APP_TEST1_LENGTH) {
            //complete the test
            navigate(`/test/completed/${id}`)
        }

    },[testCount])

    const greenStyle = {
        backgroundColor: `rgb(215,255,184)`,
        Opacity: 1
    }

    const whiteStyle = {
        backgroundColor: `rgb(255,255,255)`,
        Opacity: 1
    }

    const redStyle = {
        backgroundColor: `rgb(255,223,224)`,
        Opacity: 1
    }

    const onPlayAudio = ()=> {
        
    }

    return (
        <>
            <Container style={{ marginTop: '100px' }}>
                <Row>
                    <Col>
                        <ProgressBar variant="info" now={100 * testCount/window.config.REACT_APP_TEST1_LENGTH} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '60px' }}>
                    <Col>

                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <h2>What do you hear ?</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

                            <AudioPlayer src={audioUrl} play={false} onPlayCompleted={onAudioPlayCompleted} onPlay={onPlayAudio}/>

                        </div>


                    </Col>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    <Col>
                        {testArray &&
                            <WordSelector words={testArray.map((item) => item.word)} onSelect={handleWordSelection} />
                        }


                    </Col>
                </Row>

            </Container>


            <Container fluid className={`bottom-bar ${open ? 'show' : 'fade'}`}
                style={currentAnswerStatus == AnswerStatus.Null ? whiteStyle :
                    currentAnswerStatus == AnswerStatus.Correct ? greenStyle : redStyle}>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className={`message-icon ${currentAnswerStatus == AnswerStatus.Correct ? 'message-icon-green' : 'message-icon-red'}`}>{currentAnswerStatus == AnswerStatus.Null ? <></> :
                                currentAnswerStatus == AnswerStatus.Correct ? <FaCircleCheck /> : <FaCircleXmark />}</span>
                            <h1>{message}</h1>
                        </div>
                    </Col>
                </Row>
            </Container>


        </>

    )
}

export default TestContentPage;