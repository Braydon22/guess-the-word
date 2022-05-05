import React from 'react'

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export default function Keypad({ setLetterPressed, setChances }) {
    return (
        <div className='keypad'>
            {keys.map((singleKey, idx) => {
                return <div
                    key={idx}
                    className='single-key center-element'
                    onClick={() => {
                        setLetterPressed(singleKey);
                        setChances(prevChance => prevChance - 1);
                    }}>
                    {singleKey}
                </div>
            })}
        </div>
    )
}
