import React, { useState, useEffect, useRef } from 'react';
import { TestSet } from "../Components/TestSet";
import StarImg from '../static/star.svg';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function TestMainPage() {

    const [testList, setTestList] = useState(null);
    const navigate = useNavigate();

    interface TestInfo {
        name: string;
        order: number;
        style: any;
    }

    const numButtons = 9;
    const amplitude = 30;
    const frequency = 180 / numButtons;
    const buttons = [];

    for (let i = 0; i < numButtons; i++) {
        const xPos = Math.sin(i * frequency) * amplitude; // Adjust 100 to position the sine wave vertically
        const yPos = i * 100;

        const buttonStyle = {
            position: 'absolute',
            left: xPos + 'px',
            top: yPos + 'px',
        };

        //buttons.push(<TestSet img={StarImg} style={buttonStyle} />);
        buttons.push({
            name: 'Test 1',
            style: buttonStyle,
            order: i
        })
    }

    console.log(buttons)

    const containerStyle = {
        position: 'relative',
        height: `${100 * numButtons}px`, // Adjust 200 for additional height

    };
    const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            //fetchArray();
            fetchTestList();
        }
        return () => effectRan.current = true;
    }, []);

    


    const fetchTestList = async () => {
        try {
            const response = await axios.get(apiEndpoint + '/api/get/testlist');
            setTestList(response['data'])
        } catch (error) {
            console.error('Error fetching test list: ', error);
        }
    }

    const handleClick = (e) => {
        navigate(`/tests/${e}`);
    }

    return (
        <Container>
            <Row>
                <Col>

                    {/* <div className="tooltipx">
                        <div className="tooltipx-label">START</div>
                        <div className="tooltipx-arrow-container">
                            <div className="tooltipx-arrow"></div>
                        </div>

                    </div> */}


                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

                        <div style={containerStyle}>

                            {testList && buttons.map((bt, index) => {

                                const testItem = testList.at(index);

                                return (
                                    <TestSet img={StarImg} style={bt.style} onClick={(e) => handleClick(testItem.id)} />
                                )

                            })}
                        </div>
                    </div>

                </Col>
            </Row>


        </Container>
    )
};

export default TestMainPage;