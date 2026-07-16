import React, { useState, useMemo } from 'react';
import './App.css';

// Pre-populated mock flights
const MOCK_FLIGHTS = [
  {
    id: 'FL-001',
    airline: 'AeroGlobal',
    logo: '🌐',
    number: 'AG-302',
    fromCode: 'JFK',
    fromCity: 'New York',
    toCode: 'LAX',
    toCity: 'Los Angeles',
    depTime: '08:00 AM',
    arrTime: '11:15 AM',
    duration: '6h 15m',
    price: 320,
    date: '2026-07-20',
  },
  {
    id: 'FL-002',
    airline: 'Skyline Airways',
    logo: '☁️',
    number: 'SA-981',
    fromCode: 'LHR',
    fromCity: 'London',
    toCode: 'HND',
    toCity: 'Tokyo',
    depTime: '01:30 PM',
    arrTime: '10:45 AM',
    duration: '13h 15m',
    price: 850,
    date: '2026-07-21',
  },
  {
    id: 'FL-003',
    airline: 'Pacific Clipper',
    logo: '⚓',
    number: 'PC-404',
    fromCode: 'SYD',
    fromCity: 'Sydney',
    toCode: 'LAX',
    toCity: 'Los Angeles',
    depTime: '10:15 AM',
    arrTime: '06:30 AM',
    duration: '14h 15m',
    price: 1200,
    date: '2026-07-22',
  },
  {
    id: 'FL-004',
    airline: 'DeltaJet',
    logo: '⚡',
    number: 'DJ-712',
    fromCode: 'CDG',
    fromCity: 'Paris',
    toCode: 'DXB',
    toCity: 'Dubai',
    depTime: '03:45 PM',
    arrTime: '11:55 PM',
    duration: '6h 10m',
    price: 480,
    date: '2026-07-20',
  },
  {
    id: 'FL-005',
    airline: 'Nordic Fly',
    logo: '❄️',
    number: 'NF-219',
    fromCode: 'HEL',
    fromCity: 'Helsinki',
    toCode: 'JFK',
    toCity: 'New York',
    depTime: '11:00 AM',
    arrTime: '01:20 PM',
    duration: '9h 20m',
    price: 640,
    date: '2026-07-23',
  },
];

// Pre-define mock occupied seats for each flight
const INITIAL_OCCUPIED_SEATS = {
  'FL-001': ['1A', '1C', '2F', '3D', '4A', '4B', '5E', '6F'],
  'FL-002': ['1B', '1D', '2A', '2B', '3E', '4C', '5C', '6A', '6B'],
  'FL-003': ['1F', '2F', '3A', '3B', '4E', '5A', '5D', '6D'],
  'FL-004': ['1C', '2D', '3C', '3F', '4A', '5B', '6C'],
  'FL-005': ['1A', '1E', '2C', '3D', '4F', '5B', '6E', '6F'],
};

export default function App() {
  // App states
  const [user, setUser] = useState(null); // null when guest, user object { name, email } when logged in
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' or 'bookings'
  const [flights] = useState(MOCK_FLIGHTS);
  const [bookings, setBookings] = useState([]);
  
  // Search & Filter state
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Modals state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bookingFlight, setBookingFlight] = useState(null); // flight being booked
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Booking Form state
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(INITIAL_OCCUPIED_SEATS);
  const [bookingError, setBookingError] = useState('');

  // Dropdown City Options
  const cities = useMemo(() => {
    const froms = Array.from(new Set(flights.map(f => f.fromCity))).sort();
    const tos = Array.from(new Set(flights.map(f => f.toCity))).sort();
    return { froms, tos };
  }, [flights]);

  // Filtered flights list
  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      const matchFrom = !fromFilter || flight.fromCity.toLowerCase().includes(fromFilter.toLowerCase());
      const matchTo = !toFilter || flight.toCity.toLowerCase().includes(toFilter.toLowerCase());
      const matchDate = !dateFilter || flight.date === dateFilter;
      return matchFrom && matchTo && matchDate;
    });
  }, [flights, fromFilter, toFilter, dateFilter]);

  // Actions
  const handleOpenLogin = () => {
    setLoginUsername('');
    setLoginEmail('');
    setLoginError('');
    setLoginModalOpen(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginUsername.trim()) {
      setLoginError('Please enter a username.');
      return;
    }
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    setUser({
      name: loginUsername.trim(),
      email: loginEmail.trim(),
    });
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('flights');
  };

  const handleOpenBooking = (flight) => {
    if (!user) {
      handleOpenLogin();
      return;
    }
    setBookingFlight(flight);
    setPassengerName(user.name); // Default to current user's name
    setPassengerAge('');
    setSelectedSeats([]);
    setBookingError('');
  };

  const handleCloseBooking = () => {
    setBookingFlight(null);
  };

  const handleToggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      setBookingError('Please enter the passenger name.');
      return;
    }
    if (!passengerAge || parseInt(passengerAge) <= 0) {
      setBookingError('Please enter a valid age.');
      return;
    }
    if (selectedSeats.length === 0) {
      setBookingError('Please select at least one seat.');
      return;
    }

    // Add to Bookings
    const newBooking = {
      id: `BP-${Math.floor(100000 + Math.random() * 900000)}`,
      flight: bookingFlight,
      passengerName: passengerName.trim(),
      passengerAge: passengerAge,
      seats: selectedSeats,
      classType: 'Economy Class',
      dateBooked: new Date().toLocaleDateString(),
    };

    setBookings([newBooking, ...bookings]);

    // Update Occupied Seats
    const currentOccupied = occupiedSeats[bookingFlight.id] || [];
    setOccupiedSeats({
      ...occupiedSeats,
      [bookingFlight.id]: [...currentOccupied, ...selectedSeats],
    });

    setBookingFlight(null);
    setActiveTab('bookings'); // Redirect to my bookings page
  };

  // Generate seat rows (Row 1-6, Seat A-F)
  const renderSeatGrid = (flightId) => {
    const rows = ['1', '2', '3', '4', '5', '6'];
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    const occupied = occupiedSeats[flightId] || [];

    return (
      <div className="seat-grid">
        {rows.map(row => 
          cols.map(col => {
            const seatId = `${row}${col}`;
            const isOccupied = occupied.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                type="button"
                disabled={isOccupied}
                className={`seat-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleToggleSeat(seatId)}
                title={isOccupied ? `Seat ${seatId} (Occupied)` : `Seat ${seatId}`}
              >
                {seatId}
              </button>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Header / Navigation bar */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container" onClick={() => setActiveTab('flights')}>
            <span className="logo-icon">✈️</span>
            <span>SkyPass</span>
          </div>

          <nav className="header-nav">
            <span 
              className={`nav-link ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              Browse Flights
            </span>
            {user && (
              <span 
                className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                My Bookings
              </span>
            )}

            {user ? (
              <div className="user-profile">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">Premium Member</span>
                </div>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenLogin}>
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="main-content">
        {activeTab === 'flights' ? (
          <div className="flights-section">
            {/* Hero banner */}
            <div className="hero-banner">
              <h1 className="hero-title">Discover the World</h1>
              <p className="hero-subtitle">
                Search and book premium flights to hundreds of global destinations with comfort and ease.
              </p>
            </div>

            {/* Glassmorphic Search / Filter Panel */}
            <div className="search-panel">
              <div className="search-grid">
                <div className="search-field">
                  <label htmlFor="search-from">From</label>
                  <div className="search-input-wrapper">
                    <span className="search-input-icon">🛫</span>
                    <select
                      id="search-from"
                      className="search-select"
                      value={fromFilter}
                      onChange={(e) => setFromFilter(e.target.value)}
                    >
                      <option value="">Select departure city</option>
                      {cities.froms.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="search-field">
                  <label htmlFor="search-to">To</label>
                  <div className="search-input-wrapper">
                    <span className="search-input-icon">🛬</span>
                    <select
                      id="search-to"
                      className="search-select"
                      value={toFilter}
                      onChange={(e) => setToFilter(e.target.value)}
                    >
                      <option value="">Select destination city</option>
                      {cities.tos.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="search-field">
                  <label htmlFor="search-date">Date</label>
                  <div className="search-input-wrapper">
                    <span className="search-input-icon">📅</span>
                    <input
                      id="search-date"
                      type="date"
                      className="search-input"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {(fromFilter || toFilter || dateFilter) && (
                <div style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFromFilter('');
                      setToFilter('');
                      setDateFilter('');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Flight Results */}
            <div className="section-header">
              <h2>Available Flights</h2>
              <span className="flights-count">
                Showing {filteredFlights.length} of {flights.length} flights
              </span>
            </div>

            {filteredFlights.length > 0 ? (
              <div className="flights-grid">
                {filteredFlights.map(flight => (
                  <div key={flight.id} className="flight-card">
                    {/* Airline details */}
                    <div className="flight-airline">
                      <div className="airline-icon-bg">
                        {flight.logo}
                      </div>
                      <div className="airline-info">
                        <span className="airline-name">{flight.airline}</span>
                        <span className="flight-number">{flight.number}</span>
                      </div>
                    </div>

                    {/* Flight path graphics */}
                    <div className="flight-route">
                      <div className="route-point">
                        <span className="route-time">{flight.depTime}</span>
                        <div className="route-city">{flight.fromCity}</div>
                        <div className="route-code">{flight.fromCode}</div>
                      </div>

                      <div className="route-visual">
                        <span className="route-duration">{flight.duration}</span>
                        <div className="route-line"></div>
                        <span className="route-plane">✈️</span>
                      </div>

                      <div className="route-point">
                        <span className="route-time">{flight.arrTime}</span>
                        <div className="route-city">{flight.toCity}</div>
                        <div className="route-code">{flight.toCode}</div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flight-price-container">
                      <span className="price-label">Price per passenger</span>
                      <span className="price-amount">${flight.price}</span>
                    </div>

                    {/* Action button */}
                    <div className="flight-action">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <button
                          className={`btn ${user ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => handleOpenBooking(flight)}
                        >
                          {user ? 'Book Now' : 'Login to Book'}
                        </button>
                        {!user && (
                          <span className="lock-hint">
                            🔒 Log in to book tickets
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <div className="no-bookings-icon">🔍</div>
                <h3>No Flights Found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  We couldn't find any flights matching your criteria. Try updating your filters or destinations.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Bookings / Dashboard Page for logged-in user */
          <div className="bookings-section">
            <div className="section-header">
              <h2>My Digital Boarding Passes</h2>
              <span className="flights-count">
                You have {bookings.length} active bookings
              </span>
            </div>

            {bookings.length > 0 ? (
              <div className="bookings-grid">
                {bookings.map(booking => (
                  <div key={booking.id} className="boarding-pass-card">
                    {/* Left main ticket part */}
                    <div className="bp-main">
                      <div className="bp-header">
                        <div className="bp-airline-logo">
                          <span>{booking.flight.logo}</span>
                          <span>{booking.flight.airline}</span>
                        </div>
                        <div className="bp-class">{booking.classType}</div>
                      </div>

                      <div className="bp-flight-details">
                        <div className="bp-airport-point">
                          <div className="bp-airport-code">{booking.flight.fromCode}</div>
                          <div className="bp-airport-city">{booking.flight.fromCity}</div>
                        </div>

                        <div className="bp-route-line">
                          <span className="bp-route-plane">✈️</span>
                          <div className="route-line"></div>
                        </div>

                        <div className="bp-airport-point" style={{ textAlign: 'right' }}>
                          <div className="bp-airport-code">{booking.flight.toCode}</div>
                          <div className="bp-airport-city">{booking.flight.toCity}</div>
                        </div>
                      </div>

                      <div className="bp-grid-info">
                        <div>
                          <div className="bp-info-label">Passenger</div>
                          <div className="bp-info-value">{booking.passengerName}</div>
                        </div>
                        <div>
                          <div className="bp-info-label">Flight</div>
                          <div className="bp-info-value">{booking.flight.number}</div>
                        </div>
                        <div>
                          <div className="bp-info-label">Seat(s)</div>
                          <div className="bp-info-value">{booking.seats.join(', ')}</div>
                        </div>
                        <div>
                          <div className="bp-info-label">Date</div>
                          <div className="bp-info-value">{booking.flight.date}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right stub / barcode part */}
                    <div className="bp-stub">
                      <div className="bp-stub-header">
                        <div className="bp-stub-flight">{booking.flight.number}</div>
                        <div className="bp-stub-route">
                          {booking.flight.fromCode} ➔ {booking.flight.toCode}
                        </div>
                      </div>

                      <div>
                        <div className="bp-info-label">Seat(s)</div>
                        <div className="bp-info-value" style={{ fontSize: '1.1rem' }}>
                          {booking.seats.join(', ')}
                        </div>
                      </div>

                      <div className="bp-barcode-container">
                        <svg className="bp-barcode" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="40" fill="#ffffff" />
                          <g fill="#000000">
                            {/* SVG Simulated Barcode bars */}
                            <rect x="5" y="5" width="2" height="30" />
                            <rect x="9" y="5" width="1" height="30" />
                            <rect x="12" y="5" width="3" height="30" />
                            <rect x="17" y="5" width="1" height="30" />
                            <rect x="20" y="5" width="2" height="30" />
                            <rect x="24" y="5" width="4" height="30" />
                            <rect x="30" y="5" width="1" height="30" />
                            <rect x="33" y="5" width="2" height="30" />
                            <rect x="37" y="5" width="3" height="30" />
                            <rect x="42" y="5" width="1" height="30" />
                            <rect x="45" y="5" width="2" height="30" />
                            <rect x="49" y="5" width="4" height="30" />
                            <rect x="55" y="5" width="1" height="30" />
                            <rect x="58" y="5" width="2" height="30" />
                            <rect x="62" y="5" width="3" height="30" />
                            <rect x="67" y="5" width="1" height="30" />
                            <rect x="70" y="5" width="2" height="30" />
                            <rect x="74" y="5" width="4" height="30" />
                            <rect x="80" y="5" width="1" height="30" />
                            <rect x="83" y="5" width="2" height="30" />
                            <rect x="87" y="5" width="3" height="30" />
                            <rect x="92" y="5" width="2" height="30" />
                          </g>
                        </svg>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {booking.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <div className="no-bookings-icon">🎫</div>
                <h3>No Boarding Passes Yet</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  You haven't booked any flights. Head back to the flight browser to schedule your next trip!
                </p>
                <button className="btn btn-primary" onClick={() => setActiveTab('flights')}>
                  Search Flights
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setLoginModalOpen(false)}>
              &times;
            </button>
            <h2 className="modal-title">Sign In</h2>
            <div className="form-helper">
              💡 Tip: Enter any name and a valid email address to simulate logging in.
            </div>

            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
                  ⚠️ {loginError}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. John Doe"
                  className="form-input"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  className="form-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Confirm Login
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setLoginModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Seat Booking Modal */}
      {bookingFlight && (
        <div className="modal-backdrop">
          <div className="modal-content booking-modal">
            <button className="modal-close" onClick={handleCloseBooking}>
              &times;
            </button>

            {/* Left Column: Form & Passenger Details */}
            <div className="booking-summary-panel">
              <div>
                <h2 className="modal-title" style={{ marginBottom: '0.5rem' }}>Secure Seats</h2>
                <div className="booking-summary-header">
                  <div className="bp-airline-logo">
                    <span>{bookingFlight.logo}</span>
                    <span>{bookingFlight.airline}</span>
                  </div>
                  <div className="booking-flight-route-info">
                    <span className="summary-flight-city">{bookingFlight.fromCity}</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>➔</span>
                    <span className="summary-flight-city">{bookingFlight.toCity}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Flight No: <strong>{bookingFlight.number}</strong> | Date: <strong>{bookingFlight.date}</strong>
                  </div>
                </div>

                <form onSubmit={handleConfirmBooking}>
                  {bookingError && (
                    <div style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      ⚠️ {bookingError}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="passenger-name">Passenger Name</label>
                    <input
                      id="passenger-name"
                      type="text"
                      className="form-input"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="passenger-age">Age</label>
                    <input
                      id="passenger-age"
                      type="number"
                      min="1"
                      className="form-input"
                      placeholder="e.g. 28"
                      value={passengerAge}
                      onChange={(e) => setPassengerAge(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div>
                <div className="price-summary-box">
                  <div className="price-summary-row">
                    <span>Seat Price</span>
                    <span>${bookingFlight.price}</span>
                  </div>
                  <div className="price-summary-row">
                    <span>Selected Seats ({selectedSeats.length})</span>
                    <span>{selectedSeats.join(', ') || 'None'}</span>
                  </div>
                  <div className="price-summary-row total">
                    <span>Total Fare</span>
                    <span>${bookingFlight.price * (selectedSeats.length || 1)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 1 }}
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCloseBooking}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Cabin Seat Grid Map */}
            <div className="seat-selector-container">
              <h3>Select Seats</h3>
              <div className="cabin-indicator">Main Cabin Layout</div>
              
              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-box available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box occupied"></div>
                  <span>Occupied</span>
                </div>
              </div>

              <div className="plane-cabin">
                <div className="plane-nose"></div>
                {renderSeatGrid(bookingFlight.id)}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
