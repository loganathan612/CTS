import React from 'react';
import './App.css';
import CohortList from './components/CohortList';
import { cohorts } from './data/cohorts';

function App() {
  // Compute dynamic stats for the premium dashboard look
  const totalCohorts = cohorts.length;
  const ongoingCohorts = cohorts.filter(c => c.status === 'ongoing').length;
  const completedCohorts = cohorts.filter(c => c.status === 'completed').length;
  const totalStudents = cohorts.reduce((acc, curr) => acc + curr.strength, 0);

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>Cohort Dashboard</h1>
        <p>Overview of active and completed training programs</p>
      </header>

      <section className="stats-summary">
        <div className="stat-card">
          Total Cohorts: <strong>{totalCohorts}</strong>
        </div>
        <div className="stat-card">
          Ongoing: <strong>{ongoingCohorts}</strong>
        </div>
        <div className="stat-card">
          Completed: <strong>{completedCohorts}</strong>
        </div>
        <div className="stat-card">
          Total Strength: <strong>{totalStudents} Students</strong>
        </div>
      </section>

      <main>
        <CohortList />
      </main>
    </div>
  );
}

export default App;
