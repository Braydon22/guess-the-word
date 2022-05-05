import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WelcomeScreen from './Pages/WelcomeScreen';
import GameScreen from './Pages/GameScreen';
import Error from './Pages/Error';

import './Style/App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='/game' element={<GameScreen />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
