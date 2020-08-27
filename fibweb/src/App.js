import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is MY React Application!
        </p>
        <p>React app running in nginx container.</p>
      </header>
    </div>
  );
}

export default App;
