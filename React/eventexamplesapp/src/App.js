import React, { useState } from 'react';
import './App.css';
import CurrencyConvertor from './components/CurrencyConvertor';

function App() {
  const [counter, setCounter] = useState(0);
  const [helloMessage, setHelloMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [syntheticMessage, setSyntheticMessage] = useState('');

  // 1a. Method to increment the value
  const incrementValue = () => {
    setCounter((prev) => prev + 1);
  };

  // 1b. Method to display Hello message followed by a static message
  const sayHello = () => {
    setHelloMessage("Hello! Welcome to the counter demonstration.");
  };

  // Incrementor button invokes multiple methods
  const handleIncrement = () => {
    incrementValue();
    sayHello();
  };

  // Decrement button handler
  const handleDecrement = () => {
    setCounter((prev) => prev - 1);
  };

  // 2. Function taking "welcome" as an argument
  const showWelcome = (arg) => {
    setWelcomeMessage(`Received argument: ${arg.toUpperCase()}! Welcome to the event examples application.`);
  };

  // 3. Button click event (Synthetic click / OnPress representation)
  const handleSyntheticPress = (e) => {
    console.log("Synthetic Event Target:", e.target);
    setSyntheticMessage("I was clicked");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Events Showcase</h1>
        <p>Interactive dashboard demonstrating form and event handling in HTML/JSX</p>
      </header>

      <div className="dashboard-grid">
        {/* Section 1: Counter Events */}
        <section className="section-card">
          <h3>1. Counter (Multiple Invocation Events)</h3>
          <p className="description">
            The "Increment" button increases value and displays a "Hello" static message.
          </p>
          <div className="demo-row">
            <span className="counter-value">{counter}</span>
            <button className="action-btn" onClick={handleIncrement}>
              Increment
            </button>
            <button className="action-btn secondary" onClick={handleDecrement}>
              Decrement
            </button>
          </div>
          {helloMessage && <div className="msg-banner">{helloMessage}</div>}
        </section>

        {/* Section 2: Argument Passing Event */}
        <section className="section-card">
          <h3>2. Argument Passing</h3>
          <p className="description">
            Invokes a function passing "welcome" as a literal parameter.
          </p>
          <div className="demo-row">
            <button className="action-btn" onClick={() => showWelcome("welcome")}>
              Say Welcome
            </button>
          </div>
          {welcomeMessage && <div className="msg-banner">{welcomeMessage}</div>}
        </section>

        {/* Section 3: Synthetic Click / OnPress */}
        <section className="section-card">
          <h3>3. Synthetic Event (OnPress)</h3>
          <p className="description">
            Fires a React click handler displaying a status banner.
          </p>
          <div className="demo-row">
            <button className="action-btn" onClick={handleSyntheticPress}>
              Synthetic OnPress
            </button>
          </div>
          {syntheticMessage && <div className="msg-banner">{syntheticMessage}</div>}
        </section>

        {/* Section 4: Currency Convertor */}
        <section className="section-card">
          <CurrencyConvertor />
        </section>
      </div>
    </div>
  );
}

export default App;
