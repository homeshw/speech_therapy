import { Container, Row, Col } from "react-bootstrap";
import Lottie, { useLottie } from 'lottie-react';
import React, { useState, useEffect, useRef, createRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function TestCompletePage() {


    const results = useSelector((state) => state.results)
    const [animationData, setAnimationData] = useState(null);
    const animRef = useRef();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch('/celebration.json')
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error('Error fetching animation data:', error));
    }, []);

    const onClickRestart = () => {
        navigate(`/tests/${id}`)
    }

    const onClickMenu = () => {
        navigate(`/tests`)
    }


    return (
        <Container>
            <Row>
                <Col>
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                        <div>
                            <h1>Test completed</h1>
                        </div>
                        {results.data && !results.loading &&
                            <div>
                                <h3>Score : {`${results.data.correct}/ ${results.data.total}`}</h3>
                            </div>
                        }

                        <Container>
                            <Row>
                                <Col>
                                    <Lottie lottieRef={animRef}
                                        animationData={animationData} // Provide your animation JSON data here
                                        loop={true}
                                        autoplay={true}

                                    />
                                </Col>
                                <Col>
                                    <div style={{display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                                        <button className="button-menu" onClick={onClickRestart}>Restart</button>
                                        <button className="button-menu" onClick={onClickMenu}>Go to menu</button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>




                    </div>



                </Col>
            </Row>

        </Container >
    )
};

export default TestCompletePage;