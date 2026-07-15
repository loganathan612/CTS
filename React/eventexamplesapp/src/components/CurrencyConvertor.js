import React, { useState } from 'react';

const CurrencyConvertor = () => {
  const [inr, setInr] = useState('');
  const [eur, setEur] = useState('');
  const [resultInrToEur, setResultInrToEur] = useState(null);
  const [resultEurToInr, setResultEurToInr] = useState(null);

  // Exchange rate: 1 EUR = 90 INR (approximately)
  const EXCHANGE_RATE = 90;

  // handleSubmit handles both conversions (INR to EUR, and EUR to INR)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inr !== '') {
      const inrValue = parseFloat(inr);
      if (!isNaN(inrValue)) {
        setResultInrToEur((inrValue / EXCHANGE_RATE).toFixed(2));
      }
    } else {
      setResultInrToEur(null);
    }

    if (eur !== '') {
      const eurValue = parseFloat(eur);
      if (!isNaN(eurValue)) {
        setResultEurToInr((eurValue * EXCHANGE_RATE).toFixed(2));
      }
    } else {
      setResultEurToInr(null);
    }
  };

  return (
    <div className="convertor-container">
      <h3>Currency Convertor</h3>
      
      <form onSubmit={handleSubmit} className="convertor-form">
        <div className="converter-row">
          {/* INR to EUR */}
          <div className="converter-field">
            <label htmlFor="inr-input">Indian Rupees (INR) &rarr; Euro (EUR)</label>
            <div className="input-wrapper">
              <span className="currency-symbol">&#8377;</span>
              <input
                id="inr-input"
                type="number"
                value={inr}
                onChange={(e) => setInr(e.target.value)}
                placeholder="Enter INR amount"
                className="input-box"
              />
            </div>
            {resultInrToEur !== null && (
              <div className="conversion-output">
                Converted: <strong>&euro; {resultInrToEur}</strong>
              </div>
            )}
          </div>

          {/* EUR to INR */}
          <div className="converter-field">
            <label htmlFor="eur-input">Euro (EUR) &rarr; Indian Rupees (INR)</label>
            <div className="input-wrapper">
              <span className="currency-symbol">&euro;</span>
              <input
                id="eur-input"
                type="number"
                value={eur}
                onChange={(e) => setEur(e.target.value)}
                placeholder="Enter EUR amount"
                className="input-box"
              />
            </div>
            {resultEurToInr !== null && (
              <div className="conversion-output">
                Converted: <strong>&#8377; {resultEurToInr}</strong>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="action-btn convert-btn">
          Convert
        </button>
      </form>
    </div>
  );
};

export default CurrencyConvertor;
