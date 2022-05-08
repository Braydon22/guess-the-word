import React from 'react'

import Key from './Key'

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export default function Keypad({ setLetterPressed, setChances, currentWordToGuess }) {
    const handleClick = (singleKey) => {
        setLetterPressed(singleKey);
        setChances(prevChance => prevChance - 1);
    }

    return (
        <div className='keypad'>
            {keys.map((singleKey, idx) => {
                return <Key singleKey={singleKey} key={idx} handleClick={handleClick} currentWordToGuess={currentWordToGuess} />
            })}
        </div>
    )
}
