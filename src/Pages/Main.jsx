import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconMic from '../static/mic.png';
import IconTest from '../static/test.png';
import IconDashboard from '../static/dashboard.png';

function MainPage() {

    return (
        <div>
            <h2 className='header-text'>Hey, Are you Ready ? </h2>

            <div className='main-page-buttons'>

                <Link to="/Record" className='main-page-button'>
                    <IconButton>
                        <div>
                            <img src={IconMic} alt="Your Image" style={{ width: '20%', height: '20%' }} />
                            Record
                        </div>
                    </IconButton>
                </Link>
                <Link to="/Tests" className='main-page-button'>
                    <IconButton>
                        <div>
                            <img src={IconTest} alt="Your Image" style={{ width: '20%', height: '20%' }} />
                            Test
                        </div>
                    </IconButton>
                </Link>
                <Link to="/Dashboard" className='main-page-button'>
                    <IconButton>
                        <div>
                            <img src={IconDashboard} alt="Your Image" style={{ width: '20%', height: '20%' }} />
                            Dashboard
                        </div>
                    </IconButton>
                </Link>

                {/* <div>
                <a style={{display:false}} href="https://www.flaticon.com/free-icons/exam" title="exam icons">Exam icons created by RIkas Dzihab - Flaticon</a>
                <a style={{display:false}} href="https://www.flaticon.com/free-icons/mic" title="mic icons">Mic icons created by Kiranshastry - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/analytic" title="analytic icons">Analytic icons created by Ghozi Muhtarom - Flaticon</a>
            </div> */}

            </div>
        </div>
    );

}

export default MainPage;