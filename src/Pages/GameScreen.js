import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useGlobalContext } from '../Context'

import Keypad from '../Components/Keypad'

const getChances = (difficulty) => {
    switch (difficulty) {
        case "Easy":
            return 8;
        case "Normal":
            return 10;
        case "Hard":
            return 13;
        case "Expert":
            return 15;
    }
}
export default function GameScreen() {
    const { difficulty, getRandomWord } = useGlobalContext();
    const [currentWordToGuess, setCurrentWordToguess] = useState(getRandomWord()[0]);
    const [letterPressed, setLetterPressed] = useState("");
    const [currentCorrectLetters, setCurrentCorrectLetters] = useState([]);
    const [chances, setChances] = useState(getChances(difficulty));


    const allLettersToGuess = currentWordToGuess.split("").map((curLetter, curLetterIdx) => {
        // handle empty spaces
        if (curLetter === " ") {
            return <div
                className='single-spaces'
                key={curLetterIdx}
            >
            </div>
        }

        if (currentCorrectLetters.includes(curLetter)) {
            return <div
                className='single-letters center-element'
                key={curLetterIdx}
            >
                {curLetter}
            </div>
        }

        if (curLetter === letterPressed) {
            setCurrentCorrectLetters(prevLetters => prevLetters.concat(curLetter));
            return <div
                className='single-letters center-element'
                key={curLetterIdx}
            >
                {curLetter}
            </div>
        } else {
            return <div
                className='single-letters'
                key={curLetterIdx}
            >
            </div>
        }


    })

    const validateAnswer = () => {
        return currentWordToGuess.replace(" ", "").length === currentCorrectLetters.length
    }

    const getNextWord = () => {
        setCurrentCorrectLetters([]);
        setCurrentWordToguess(getRandomWord()[0]);
        setChances(getChances(difficulty));
    }

    if (chances === 0) {
        setChances(getChances(difficulty));
        window.alert("You ran out of chances !! Correct Answer is: " + currentWordToGuess);
        getNextWord();
    }

    return (
        <div className='game-screen'>
            <header className='center-element'>
                <div className='back-arrow'>
                    <Link to='/'>
                        <FaArrowLeft size={55} color="black" />
                    </Link>
                </div>

                <h1>
                    {difficulty}
                </h1>
            </header>
            {validateAnswer()
                ? <div>
                    <div id='correctAnswer'> <FaCheck size={55} color="green" /></div>
                    <button onClick={() => getNextWord()} id="next-word-button"> Next Word </button>
                </div>
                : <div id='chances-left' style={{ color: chances < 5 ? "#f05959" : "black" }}>{chances} More chance(s) left !</div>
            }
            <div id="word-to-guess-container">
                <div className='word-to-guess center-element'>
                    {allLettersToGuess}
                </div>
            </div>
            <div className='keypad-container'>
                <Keypad setLetterPressed={setLetterPressed} setChances={setChances} />
            </div>
        </div>
    )
}
