import React from 'react';

const ListofPlayers = () => {
  // Array of 11 players with names and scores
  const players = [
    { name: "Virat Kohli", score: 85 },
    { name: "Rohit Sharma", score: 92 },
    { name: "KL Rahul", score: 45 },
    { name: "Rishabh Pant", score: 78 },
    { name: "Hardik Pandya", score: 60 },
    { name: "Ravindra Jadeja", score: 55 },
    { name: "Jasprit Bumrah", score: 20 },
    { name: "Mohammed Shami", score: 15 },
    { name: "Shubman Gill", score: 72 },
    { name: "Shreyas Iyer", score: 68 },
    { name: "Suryakumar Yadav", score: 95 }
  ];

  // Filtering players with scores >= 70 (filtering out players with scores below 70)
  // using ES6 arrow function
  const highScoringPlayers = players.filter(player => player.score >= 70);

  return (
    <div className="component-container">
      <h2>List of Players</h2>
      
      <div className="sub-section">
        <h3>All Players (ES6 Map)</h3>
        <table className="player-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sub-section">
        <h3>Filtered Players (Scores &ge; 70)</h3>
        <table className="player-table filtered">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {highScoringPlayers.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td className="high-score">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListofPlayers;
