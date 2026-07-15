import React from 'react';

const IndianPlayers = () => {
  // Array of Indian players for destructuring
  const indianPlayersList = ["Dhoni", "Sachin", "Kohli", "Dravid", "Sehwag", "Yuvraj"];

  // Destructuring features of ES6
  const [first, second, third, fourth, fifth, sixth] = indianPlayersList;

  // Odd Team (1st, 3rd, 5th elements) and Even Team (2nd, 4th, 6th elements)
  const oddTeam = [first, third, fifth];
  const evenTeam = [second, fourth, sixth];

  // Two arrays for T20 and Ranji Trophy players
  const T20players = ["Virat Kohli", "Rohit Sharma", "Hardik Pandya"];
  const RanjiTrophyPlayers = ["Sarfaraz Khan", "Abhimanyu Easwaran", "Yash Dhull"];

  // Merge the two arrays using the spread operator (Merge feature of ES6)
  const mergedPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="component-container">
      <h2>Indian Players</h2>

      <div className="sub-section grid">
        <div className="grid-col">
          <h3>Odd Team Players</h3>
          <p className="description">Destructured from positions 1, 3, 5</p>
          <ul className="player-list">
            {oddTeam.map((player, idx) => (
              <li key={idx} className="player-item odd">{player}</li>
            ))}
          </ul>
        </div>

        <div className="grid-col">
          <h3>Even Team Players</h3>
          <p className="description">Destructured from positions 2, 4, 6</p>
          <ul className="player-list">
            {evenTeam.map((player, idx) => (
              <li key={idx} className="player-item even">{player}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sub-section">
        <h3>Merged T20 &amp; Ranji Trophy Players</h3>
        <p className="description">Combined using the ES6 Spread (...) operator</p>
        <div className="badge-container">
          {mergedPlayers.map((player, idx) => (
            <span key={idx} className="player-badge">{player}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndianPlayers;
