import React, { useState } from 'react';
import './App.css';
import ListofPlayers from './components/ListofPlayers';
import IndianPlayers from './components/IndianPlayers';

function App() {
  const [flag, setFlag] = useState(true);

  // Simple if-else conditional block for rendering based on the flag
  let renderedComponent;
  if (flag) {
    renderedComponent = <ListofPlayers />;
  } else {
    renderedComponent = <IndianPlayers />;
  }

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>Cricket App</h1>
        <p>ES6 Features Showcase: Map, Filter, Destructuring, Spread</p>
      </header>

      <section className="controls-container">
        <div className="toggle-info">
          Flag status is: <span>{flag.toString()}</span>
        </div>
        <button 
          className="toggle-btn" 
          onClick={() => setFlag(!flag)}
        >
          Toggle Component
        </button>
      </section>

      <main>
        {renderedComponent}
      </main>
    </div>
  );
}

export default App;
