import React from 'react'
import { useGlobalContext } from '../Context'

export default function DifficultySelector() {
    const { difficulties, setDifficulty, difficulty } = useGlobalContext();

    return (
        <div className="difficulties">
            {difficulties.map((difficultyVal, idx) => {
                return <div
                    className={
                        difficulty === difficultyVal ? 'currentDifficulty center-element' : 'difficulty center-element'
                    }
                    onClick={() => setDifficulty(difficultyVal)}
                    key={idx}
                    style={{ margin: Math.floor(Math.random() * 10), borderRadius: Math.floor(Math.random() * (15 + 18) + 15) }}
                >
                    {difficultyVal}
                </div>
            })}
        </div>
    )
}
