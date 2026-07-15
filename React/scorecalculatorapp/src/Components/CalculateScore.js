import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore(props) {

    const average = props.Total / props.goal;

    return (
        <div className="container">
            <h1>Student Score Calculator</h1>

            <h3>Name : {props.Name}</h3>
            <h3>School : {props.School}</h3>
            <h3>Total Score : {props.Total}</h3>
            <h3>Goal (Subjects) : {props.goal}</h3>

            <h2>Average Score : {average}</h2>
        </div>
    );
}

export default CalculateScore;