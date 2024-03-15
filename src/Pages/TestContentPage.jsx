import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../Components/AudioPlayer";
import { Container, Row, Col } from "react-bootstrap";
import WordSelector from "../Components/WordSelector";
import correctSoundFile from '../static/sound/correct-ans.wav';
import wrongSoundFile from '../static/sound/wrong-ans.wav';
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from "react-router-dom";
import { fetchTestById } from "../Redux/reducers/testSlice";
import { useSelector, useDispatch } from 'react-redux'
import { saveResults, saveUserTestResults } from "../Redux/reducers/userTestSlice";

const AnswerStatus = {
    Null: 'Null',
    Correct: 'Correct',
    Incorrect: 'Incorrect'
}

function TestContentPage() {

    const { id } = useParams();
    const tests = useSelector((state) => state.tests.tests[id])
    const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;
    
    const dispatch = useDispatch();

    const [audioUrl, setAudioUrl] = useState('');

    const [currentClip, setCurrentClip] = useState({});
    const [message, setMessage] = useState("");

    const [isPlaying, setIsPlaying] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [currentAnswerStatus, setCurrentAnswerStatus] = useState(AnswerStatus.Null);
    const [testCount , setTestCount] = useState(0);
    const [correctAnswerCount ,setCorrectAnswerCount] = useState(0);

    const navigate = useNavigate();

    //get all words in the for the test
    useEffect(()=> {

        dispatch(fetchTestById(id));

    },[dispatch])

    const selectRandomClip = () => {
        const randomIndex = Math.floor(Math.random() * tests.length);
        const x = tests[randomIndex]
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


    //when data recieved randomely select a word
    useEffect(() => {

        if (tests != null)
            selectRandomClip();

    }, [tests])

    
    useEffect(() => {

        if (Object.keys(currentClip).length > 0) {
            setAudioUrl(apiEndpoint + '/api/get/audio/' + currentClip.src)
        }

    }, [currentClip])


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

        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false)
        }, 2000);
    }

    useEffect(()=> {

        if (testCount == window.config.REACT_APP_TEST1_LENGTH) {
            //complete the test

            dispatch(saveResults({testId : id, correct: correctAnswerCount, total : window.config.REACT_APP_TEST1_LENGTH }))


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
                        {tests != null &&
                            <WordSelector words={tests.map((item) => item.word)} onSelect={handleWordSelection} />
                        }


                    </Col>
                </Row>

            </Container>


            <Container fluid className={`bottom-bar ${showMessage ? 'show' : 'fade'}`}
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