import React from 'react';
import CohortDetails from './CohortDetails';
import { cohorts } from '../data/cohorts';

const CohortList = () => {
  return (
    <div className="cohort-list">
      {cohorts.map((cohort) => (
        <CohortDetails key={cohort.id} cohort={cohort} />
      ))}
    </div>
  );
};

export default CohortList;
