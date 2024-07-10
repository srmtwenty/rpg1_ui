import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function MainPage(){

    return(
        <>
            <h2>RPG Project Version 1.0</h2>
            
            <p>New User? <Link to={`/register`}>Sign Up</Link></p>
            <p>New Player? <Link to={`/login`}>Login and Create Player</Link></p>
        </>
    )
}
export default MainPage;