import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useGlobalContext } from '../Context'

import Keypad from '../Components/Keypad'

const getChances = (difficulty) => {
    switch (difficulty) {
        case "Easy":
            return 13;
        case "Normal":
            return 13;
        case "Hard":
            return 16;
        case "Expert":
            return 16;
        default: return 14;
    }
}

const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

export default function GameScreen() {
    const { difficulty, getRandomWord } = useGlobalContext();
    const [currentWordToGuess, setCurrentWordToguess] = useState(getRandomWord()[0]);
    const [letterPressed, setLetterPressed] = useState("");
    const [currentCorrectLetters, setCurrentCorrectLetters] = useState([]);
    const [chances, setChances] = useState(getChances(difficulty));
    const [hintLoading, setHintLoading] = useState(false);
    const [hint, setHint] = useState("");

    const fetchHint = useCallback(async () => {
        try {
            setHintLoading(true)
            const response = await fetch(dictionaryUrl + currentWordToGuess.split(" ")[0]);
            const data = await response.json();

            const { meanings } = data[0]
            setHint(meanings[0].definitions[0].definition)
            setHintLoading(false)
        } catch (error) {
            console.log("fetch hint error: " + error);
        }
    }, [currentWordToGuess])
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
            setChances(prevChance => prevChance + 1);
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

    useEffect(() => {
        fetchHint();
    }, [currentWordToGuess, fetchHint])

    return (
        <div className='game-screen'>
            <header className='center-element'>
                <div style={{ margin: "20px" }}>
                    <Link to='/'>
                        <FaArrowLeft size={55} color="black" />
                    </Link>
                </div>

                <p id={hintLoading ? 'hint-loading' : 'hint'} className="center-element">
                    {hintLoading ? "Loading Hint ..." :
                        difficulty === "Expert"
                            ? "Hint for first word: " + hint
                            : "Hint: " + hint
                    }
                </p>
            </header>
            {validateAnswer()
                ? <div>
                    <div id='correctAnswer'> <FaCheck size={55} color="green" /></div>
                    <button onClick={() => getNextWord()} id="next-word-button"> Next Word </button>
                </div>
                : <div id='chances-left'
                    style={{ color: chances < 5 ? "#f05959" : "black" }}>{chances} More chance(s) left !
                    <p
                        onClick={() => getNextWord()}
                        id="next-question"
                    >
                        Too Hard ? Next Question
                    </p>
                </div>
            }
            <div id="word-to-guess-container">
                <div className='word-to-guess center-element'>
                    {allLettersToGuess}
                </div>
            </div>
            <div className='keypad-container'>
                <Keypad setLetterPressed={setLetterPressed} setChances={setChances} currentWordToGuess={currentWordToGuess} />
            </div>
        </div>
    )
}
