import React from 'react';
import './App.css';
import { featuredOffice, officesList } from './data/offices';

function App() {
  // Dynamic CSS styling for Rent color: Red if below 60000, Green if 60000 or above
  const getRentStyle = (rent) => {
    return {
      color: rent < 60000 ? '#e11d48' : '#16a34a', // red if < 60k, green if >= 60k
      fontWeight: 'bold'
    };
  };

  return (
    <div className="app-container">
      {/* 1. Element to display the heading of the page */}
      <h1 className="app-heading">
        FlexSpace <span>Office Rentals</span>
      </h1>
      <p className="app-subheading">
        Discover premium workspaces designed to fuel innovation and productivity
      </p>

      {/* 2. Featured Office Card (Display details like Name, Rent, Address of the featured office object) */}
      <section className="featured-section">
        {/* Attribute to display the image of the office space */}
        <div className="featured-img-container">
          <img 
            src={featuredOffice.image} 
            alt={featuredOffice.name} 
            className="featured-img" 
          />
          <span className="featured-badge">Featured Space</span>
        </div>
        
        <div className="featured-content">
          <h2>{featuredOffice.name}</h2>
          <p className="featured-address">{featuredOffice.address}</p>
          <div className="featured-rent">
            {/* Rent display with conditional style rule */}
            Rent: <span style={getRentStyle(featuredOffice.rent)}>
              &#8377;{featuredOffice.rent.toLocaleString()}
            </span> 
            <span className="rent-tag">/ month</span>
          </div>
        </div>
      </section>

      {/* 3. List of Office Objects (Loop through items to display more data) */}
      <section>
        <h2 className="listings-heading">Explore Office Listings</h2>
        <div className="listings-grid">
          {officesList.map((office) => (
            <div key={office.id} className="office-card">
              <span className="card-tag">{office.type}</span>
              <h3>{office.name}</h3>
              <p className="card-address">{office.address}</p>
              
              <div className="card-footer">
                <span className="card-rent">
                  {/* CSS rule: Red if rent < 60000, Green if above 60000 */}
                  Rent: <span style={getRentStyle(office.rent)}>
                    &#8377;{office.rent.toLocaleString()}
                  </span>
                </span>
                <span className="card-meta">{office.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
