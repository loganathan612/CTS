import React from 'react';
import styles from './CohortDetails.module.css';

const CohortDetails = ({ cohort }) => {
  return (
    <div className={styles.box}>
      <h3
        style={{
          color: cohort.status === "ongoing" ? "green" : "blue"
        }}
      >
        {cohort.name}
      </h3>
      <dl>
        <dt>Trainer</dt>
        <dd>{cohort.trainer}</dd>
        
        <dt>Current Week</dt>
        <dd>Week {cohort.currentWeek}</dd>
        
        <dt>Strength</dt>
        <dd>{cohort.strength}</dd>
        
        <dt>Status</dt>
        <dd style={{ textTransform: 'capitalize' }}>{cohort.status}</dd>
      </dl>
    </div>
  );
};

export default CohortDetails;
