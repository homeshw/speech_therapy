import React, { useEffect, useMemo } from 'react';
import { TestUnitButton } from "../Components/TestUnitButton";
import StarImg from '../static/star.svg';
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

    // const computedTests = useMemo(() => {

    //     const buttons = [];

    //     for (let i = 0; i < numButtons; i++) {
    //         const xPos = Math.sin(i * frequency) * amplitude; // Adjust 100 to position the sine wave vertically
    //         const yPos = i * 100;

    //         const buttonStyle = {
    //             position: 'absolute',
    //             left: xPos + 'px',
    //             top: yPos + 'px',
    //         };

    //         buttons.push({
    //             name: 'Test 1',
    //             style: buttonStyle,
    //             order: i
    //         })
    //     }

    //     return buttons;

    // }, [tests])

    const COLS = 4;

    const rowsItems = useMemo(() => {

        const rows = [];
        for (let i = 0; i < tests.testlist.length; i += COLS) {

            const rowItems = tests.testlist.slice(i, i + COLS);
            rows.push(rowItems);
        }

        return rows;



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

                    
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                    
                        <Container>
                        <h2>Test Modules</h2>
                            {tests.testlist.length > 0 && rowsItems.map((rowItem, index) => {

                                return (
                                    <Row key={index}>
                                        {rowItem.map((testItem,colindex) => {
                                            return (
                                                <Col md={3}>
                                                    <TestUnitButton key={colindex} name={testItem.name} img={StarImg} onClick={(e) => handleClick(testItem.id)} />
                                                </Col>
                                            )
                                        })}

                                    </Row>

                                )

                            })}

                        </Container>

                    </div>

                </Col>
            </Row>


        </Container >
    )
};

export default TestMainPage;