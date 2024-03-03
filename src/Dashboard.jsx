import ResultsGrid from "./ResultsGrid";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Dashboard() {

    const [results, setResults] = useState(null)
    const [refresh, setRefresh] = useState(false);

    // Access the API endpoint
    const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            fetchResults();
        }
        return () => effectRan.current = true;
    }, [refresh]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(apiEndpoint + '/api/get/results/grid');
            console.log('fetching grid data')
            setResults(response['data'])
        } catch (error) {
            console.error('Error fetching grid data: ', error);
        }
    }


    return (
        <>
            {
                results && results != undefined && results.length > 0 ? (
                    <div>
                        <ResultsGrid rows={results}></ResultsGrid>
                    </div>
                )
                    :
                    <div></div>
            }
        </>
    )
}

export default Dashboard;