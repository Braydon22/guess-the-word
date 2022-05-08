import React, { useState, useEffect } from 'react'

export default function Key({ singleKey, handleClick, currentWordToGuess }) {
    const [isActive, setIsActive] = useState(true);

    const handleCurrentKeyClick = () => {
        if (isActive) {
            handleClick(singleKey);
            setIsActive(false);
        }
    }

    // reset keys when user go to next word
    useEffect(() => {
        setIsActive(true);
    }, [currentWordToGuess])

    return (
        <div
            className={isActive ? 'single-key center-element' : "single-key-inactive center-element"}
            onClick={handleCurrentKeyClick}
        >
            {singleKey}
        </div>
    )
}
