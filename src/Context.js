import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const difficulties = ['Easy', 'Normal', 'Hard', 'Expert']
    const [difficulty, setDifficulty] = useState(difficulties[0])
    const randomWord = require('random-words');

    const getRandomWord = () => {
        switch (difficulty) {
            case "Easy":
                return randomWord({ exactly: 1, maxLength: 4 });
            case "Normal":
                return randomWord({ exactly: 1, maxLength: 5 });
            case "Hard":
                return randomWord({ exactly: 1, maxLength: 10 });
            case "Expert":
                return randomWord({ exactly: 1, wordsPerString: 2 })
        }
    }

    getRandomWord();
    return <AppContext.Provider
        value={{
            difficulties,
            difficulty,
            setDifficulty,
            getRandomWord,
        }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }