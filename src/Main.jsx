import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function MainPage() {

    return (
        <div>
            <Link to="/Record"> <Button>Recording Page</Button></Link>
            <Link to="/Test1"> <Button>Test 1</Button></Link>
        </div>
    );

}

export default MainPage;