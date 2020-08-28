import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is MY React Application!</p>
        <p>Accessed via nginx proxy with live update if in dev dockerfile is used.</p>
        <p>I'm going to create multiple docker-compose.yml files (dev and prod). WORKS FINE!</p>
        <p>...but NOT everytime ;-(!</p>
      </header>
    </div>
  );
}

export default App;
