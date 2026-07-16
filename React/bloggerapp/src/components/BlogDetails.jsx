import React from 'react';

const MOCK_BLOGS = [
  {
    id: 'bl-201',
    title: 'React 19 Features Unveiled',
    author: 'Sarah Jenkins',
    category: 'React & Frontend',
    readTime: '6 min read',
    date: 'July 14, 2026',
    excerpt: 'Explore the new compilation engine, React Server Components refinements, and enhanced hooks introduced in React 19.',
    likes: 342
  },
  {
    id: 'bl-202',
    title: 'Mastering Modern CSS Layouts',
    author: 'Alex Rivera',
    category: 'CSS & Design',
    readTime: '8 min read',
    date: 'June 28, 2026',
    excerpt: 'Dive deep into CSS Grid Areas, Subgrid, container queries, and logical properties to build highly responsive layout templates.',
    likes: 218
  },
  {
    id: 'bl-203',
    title: 'Asynchronous Programming Guide',
    author: 'David Chen',
    category: 'JavaScript Core',
    readTime: '10 min read',
    date: 'May 15, 2026',
    excerpt: 'A comprehensive walkthrough of Promises, Async/Await syntax, event loops, and how to avoid callback hell in JS applications.',
    likes: 412
  }
];

export default function BlogDetails() {
  return (
    <div className="detail-section">
      <div className="section-title-wrapper">
        <span className="section-icon">✍️</span>
        <h3>Blog Details</h3>
      </div>
      
      {/* 
        KEYS IN REACT APPLICATIONS:
        When map() generates a list of sibling components, React uses the unique key property
        to establish identity across render cycles. This minimizes DOM re-creation and preserves state.
        For these blog details, the unique ID `blog.id` is chosen.
      */}
      <div className="card-grid">
        {MOCK_BLOGS.map((blog) => (
          <div key={blog.id} className="item-card blog-card">
            <div className="card-header">
              <span className="card-badge blog-badge">{blog.category}</span>
              <span className="card-id">ID: {blog.id}</span>
            </div>
            
            <h4 className="item-title">{blog.title}</h4>
            <p className="item-subtitle">Published by {blog.author} on {blog.date}</p>
            
            <p className="item-summary">{blog.excerpt}</p>
            
            <div className="card-footer">
              <div className="meta-container">
                <span className="read-time-icon">⏱️</span>
                <span className="read-time-value">{blog.readTime}</span>
              </div>
              <div className="likes-badge">
                <span className="heart-icon">❤️</span>
                <span>{blog.likes} Likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
