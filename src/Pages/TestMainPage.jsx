import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TestSet } from "../Components/TestSet";
import StarImg from '../static/star.svg';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchTestAll } from '../Redux/reducers/testSlice'


function TestMainPage() {

    const tests = useSelector((state) => state.tests)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const numButtons = 9;
    const amplitude = 30;
    const frequency = 180 / numButtons;
    

    const containerStyle = {
        position: 'relative',
        height: `${100 * numButtons}px`, // Adjust 200 for additional height

    };

    useEffect(() => {
        dispatch(fetchTestAll());
    }, [dispatch])

    const computedTests = useMemo(() => {

        const buttons = [];

        for (let i = 0; i < numButtons; i++) {
            const xPos = Math.sin(i * frequency) * amplitude; // Adjust 100 to position the sine wave vertically
            const yPos = i * 100;

            const buttonStyle = {
                position: 'absolute',
                left: xPos + 'px',
                top: yPos + 'px',
            };

            buttons.push({
                name: 'Test 1',
                style: buttonStyle,
                order: i
            })
        }

        return buttons;

    }, [tests])

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

                            {tests.testlist.length > 0 && computedTests.map((bt, index) => {

                                const testItem = tests.testlist[index];
                                console.log(testItem)
                                return (
                                    <TestSet key={index} img={StarImg} style={bt.style} onClick={(e) => handleClick(testItem.id)} />
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