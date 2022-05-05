import React from 'react'
import { Link } from 'react-router-dom'

import DifficultySelector from '../Components/DifficultySelector';

export default function WelcomeScreen() {
    return (
        <div className='welcome-screen center-element'>
            <h2> Choose Difficulty </h2>
            <DifficultySelector />
            <div>
                <h1> Guess the Word </h1>
                <div className='center-element'>
                    <Link to='/game'>
                        <button style={{ marginTop: '15%' }}>
                            Start
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
