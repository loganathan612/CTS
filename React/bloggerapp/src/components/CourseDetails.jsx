import React from 'react';

const MOCK_COURSES = [
  {
    id: 'cr-301',
    title: 'Full-Stack Web Development Boot Camp',
    instructor: 'Dr. Angela Yu',
    level: 'Beginner to Advanced',
    duration: '60 hours',
    lessons: 120,
    price: 99.99,
    progress: 85,
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, and deploy production-ready applications.'
  },
  {
    id: 'cr-302',
    title: 'React Native - Build Mobile Apps',
    instructor: 'Maximilian Schwarzmüller',
    level: 'Intermediate',
    duration: '32 hours',
    lessons: 85,
    price: 79.99,
    progress: 45,
    description: 'Build native iOS and Android mobile apps using JavaScript/TypeScript and the power of React.'
  },
  {
    id: 'cr-303',
    title: 'Data Structures & Algorithms Masterclass',
    instructor: 'Colt Steele',
    level: 'Intermediate to Advanced',
    duration: '24 hours',
    lessons: 70,
    price: 89.99,
    progress: 10,
    description: 'Master Big O notation, common sorting algorithms, trees, graphs, dynamic programming, and ace coding interviews.'
  }
];

export default function CourseDetails() {
  return (
    <div className="detail-section">
      <div className="section-title-wrapper">
        <span className="section-icon">🎓</span>
        <h3>Course Details</h3>
      </div>
      
      {/* 
        EXTRACTING COMPONENTS WITH KEYS:
        Keys must be defined directly in the mapping context rather than on the child
        component's internal wrapper. The mapping loop below provides the key prop `course.id`
        directly to the outer JSX element in the map expression.
      */}
      <div className="card-grid">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="item-card course-card">
            <div className="card-header">
              <span className="card-badge course-badge">{course.level}</span>
              <span className="card-id">ID: {course.id}</span>
            </div>
            
            <h4 className="item-title">{course.title}</h4>
            <p className="item-subtitle">Instructed by {course.instructor}</p>
            
            <p className="item-summary">{course.description}</p>
            
            {/* Dynamic Progress Bar */}
            <div className="progress-section">
              <div className="progress-label-row">
                <span>Course Progress</span>
                <span className="progress-percentage">{course.progress}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="card-footer" style={{ marginTop: '1.25rem' }}>
              <div className="meta-container">
                <span className="meta-info-item">⏳ {course.duration}</span>
                <span className="meta-info-item" style={{ marginLeft: '0.75rem' }}>📚 {course.lessons} lectures</span>
              </div>
              <div className="price-tag">${course.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
