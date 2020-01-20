import React from 'react';
import './App.css';
import Game from './components/Game/Game';
import HighScore from './components/HighScore/HighScore';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Register />
          <Login />
        </div>
        <Game />
        <HighScore />
      </header>
    </div>
  );
}

export default App;
