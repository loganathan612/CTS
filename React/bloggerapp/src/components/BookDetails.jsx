import React from 'react';

const MOCK_BOOKS = [
  {
    id: 'bk-101',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Software Engineering',
    rating: 4.8,
    price: 39.99,
    summary: 'A handbook of agile software craftsmanship. Learn to write clean code, identify bad code, and refactor efficiently.'
  },
  {
    id: 'bk-102',
    title: 'Design Patterns',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    genre: 'Systems Architecture',
    rating: 4.9,
    price: 49.99,
    summary: 'The classic catalog of reusable object-oriented software designs. Explains 23 patterns in detail with examples.'
  },
  {
    id: 'bk-103',
    title: "You Don't Know JS Yet",
    author: 'Kyle Simpson',
    genre: 'JavaScript Programming',
    rating: 4.7,
    price: 24.99,
    summary: 'An in-depth guide to understanding JavaScript at its core, explaining closures, scopes, prototypes, and types.'
  }
];

export default function BookDetails() {
  return (
    <div className="detail-section">
      <div className="section-title-wrapper">
        <span className="section-icon">📚</span>
        <h3>Book Details</h3>
      </div>
      
      {/* 
        LIST COMPONENT IMPLEMENTATION:
        We render the list of books by calling the map() function on the MOCK_BOOKS array.
        Each child element in the array must be assigned a unique "key" prop to help React identify
        which items have changed, been added, or been removed. Here, we use `book.id`.
      */}
      <div className="card-grid">
        {MOCK_BOOKS.map((book) => (
          <div key={book.id} className="item-card book-card">
            <div className="card-header">
              <span className="card-badge book-badge">{book.genre}</span>
              <span className="card-id">ID: {book.id}</span>
            </div>
            
            <h4 className="item-title">{book.title}</h4>
            <p className="item-subtitle">By {book.author}</p>
            
            <p className="item-summary">{book.summary}</p>
            
            <div className="card-footer">
              <div className="rating-container">
                <span className="star-icon">⭐</span>
                <span className="rating-value">{book.rating}</span>
              </div>
              <div className="price-tag">${book.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
