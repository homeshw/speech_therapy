import ResultsGrid from "../ResultsGrid";
import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector, useDispatch } from 'react-redux'
import { loadResults, loadResultsByTestId } from "../Redux/reducers/userTestSlice";
import { Container, Form, Row, Col } from "react-bootstrap";
import { fetchTestAll } from '../Redux/reducers/testSlice'

function Dashboard() {

    const results = useSelector((state) => state.results)
    const tests = useSelector((state) => state.tests)

    const dispatch = useDispatch();

    const [selectedTest, setSelectedTest] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {

        dispatch(loadResults());

        dispatch(fetchTestAll());



    }, [dispatch])

    useEffect(() => {

        if (tests.testlist != null && tests.testlist.length > 0) {
            dispatch(loadResultsByTestId(tests.testlist[0].id))
        }


    }, [tests.testlist])


    useEffect(() => {

        if (results.userResultsStats != null) {

            var res = results.userResultsStats.map((item) => {
                return [
                    item.createdAt,
                    item.correct/(item.total)
                ]
            });

            console.log(res);
            setData(res)

        }


    }, [results])


    const option = {
        tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //     return [pt[0], '10%'];
            // }
        },
        title: {
            left: 'center',
            text: 'User progress over time'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'Data',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: data
            }
        ]
    };

    useEffect(() => {
        dispatch(loadResultsByTestId(selectedTest))
    }, [selectedTest])


    return (
        <Container>
            <Row>
                <Col md={6}>
                    {
                        (results && results != undefined && results.userResults.length > 0) &&
                        <div>
                            <ResultsGrid rows={results.userResults}></ResultsGrid>


                        </div>

                    }
                </Col>
            </Row>
            <Row>
                <Col>
                <label>Select the test</label>
                    <div className="select-tests">
                        <Form.Select value={selectedTest} onChange={(e) => setSelectedTest(e.currentTarget.value)}>
                            {tests.testlist != null &&

                                tests.testlist.map((item) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )


                                })

                            }
                        </Form.Select>
                    </div>

                    <ReactECharts option={option} />
                </Col>

            </Row>

        </Container>
    )
}

export default Dashboard;