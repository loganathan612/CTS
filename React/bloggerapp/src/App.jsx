import React, { useState } from 'react';
import BookDetails from './components/BookDetails';
import BlogDetails from './components/BlogDetails';
import CourseDetails from './components/CourseDetails';
import './App.css';

// Helper component illustrating "Return Null" conditional rendering method
function NullReturnWrapper({ show, children }) {
  if (!show) {
    /* 
      PREVENTING COMPONENT RENDERING WITH NULL:
      In React, returning null from a component's render method prevents it from rendering 
      any DOM node. This is useful for toggling visibility without writing logic in the parent.
    */
    return null; 
  }
  return children;
}

export default function App() {
  // Playground State
  const [showBooks, setShowBooks] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [renderMethod, setRenderMethod] = useState('ternary'); // 'ternary' | 'logical-and' | 'variables' | 'if-else' | 'switch-case' | 'null-return'

  // If-Else rendering subroutine
  const renderWithIfElse = (books, blogs, courses) => {
    const list = [];
    if (books) {
      list.push(<BookDetails key="books-ie" />);
    }
    if (blogs) {
      list.push(<BlogDetails key="blogs-ie" />);
    }
    if (courses) {
      list.push(<CourseDetails key="courses-ie" />);
    }
    
    if (list.length === 0) {
      return (
        <div className="empty-renderer">
          <span className="empty-icon">❌</span>
          <p>No components selected for rendering using If-Else subroutine.</p>
        </div>
      );
    }
    return list;
  };

  // Switch-Case rendering subroutine
  const renderSwitchCase = (type) => {
    switch (type) {
      case 'books':
        return <BookDetails key="books-sc" />;
      case 'blogs':
        return <BlogDetails key="blogs-sc" />;
      case 'courses':
        return <CourseDetails key="courses-sc" />;
      default:
        return null;
    }
  };

  // Dynamic code snippet generator based on state
  const getCodeSnippet = () => {
    switch (renderMethod) {
      case 'ternary':
        return `// 1. Ternary Operator (? :)
return (
  <div className="renderer-content">
    {showBooks ? <BookDetails /> : null}
    {showBlogs ? <BlogDetails /> : null}
    {showCourses ? <CourseDetails /> : null}
  </div>
);`;
      case 'logical-and':
        return `// 2. Logical AND Operator (&&)
return (
  <div className="renderer-content">
    {showBooks && <BookDetails />}
    {showBlogs && <BlogDetails />}
    {showCourses && <CourseDetails />}
  </div>
);`;
      case 'variables':
        return `// 3. Element Variables
let booksElement = null;
let blogsElement = null;
let coursesElement = null;

if (showBooks) booksElement = <BookDetails />;
if (showBlogs) blogsElement = <BlogDetails />;
if (showCourses) coursesElement = <CourseDetails />;

return (
  <div className="renderer-content">
    {booksElement}
    {blogsElement}
    {coursesElement}
  </div>
);`;
      case 'if-else':
        return `// 4. If-Else Helper Subroutine
const renderWithIfElse = (books, blogs, courses) => {
  const list = [];
  if (books) list.push(<BookDetails key="bk" />);
  if (blogs) list.push(<BlogDetails key="bl" />);
  if (courses) list.push(<CourseDetails key="cr" />);
  return list.length > 0 ? list : <EmptyNotice />;
};

return (
  <div className="renderer-content">
    {renderWithIfElse(showBooks, showBlogs, showCourses)}
  </div>
);`;
      case 'switch-case':
        return `// 5. Switch-Case Selection
const renderSwitchCase = (type) => {
  switch (type) {
    case 'books': return <BookDetails key="bk" />;
    case 'blogs': return <BlogDetails key="bl" />;
    case 'courses': return <CourseDetails key="cr" />;
    default: return null;
  }
};

return (
  <div className="renderer-content">
    {['books', 'blogs', 'courses'].map(type => {
      if (type === 'books' && showBooks) return renderSwitchCase('books');
      if (type === 'blogs' && showBlogs) return renderSwitchCase('blogs');
      if (type === 'courses' && showCourses) return renderSwitchCase('courses');
      return null;
    })}
  </div>
);`;
      case 'null-return':
        return `// 6. Preventing Rendering with Null (Child Wrapper)
function NullReturnWrapper({ show, children }) {
  if (!show) return null; // Returns null, rendering nothing to DOM
  return children;
}

return (
  <div className="renderer-content">
    <NullReturnWrapper show={showBooks}>
      <BookDetails />
    </NullReturnWrapper>
    <NullReturnWrapper show={showBlogs}>
      <BlogDetails />
    </NullReturnWrapper>
    <NullReturnWrapper show={showCourses}>
      <CourseDetails />
    </NullReturnWrapper>
  </div>
);`;
      default:
        return '';
    }
  };

  // Evaluate variable rendering
  let booksVar = null;
  let blogsVar = null;
  let coursesVar = null;
  if (showBooks) booksVar = <BookDetails />;
  if (showBlogs) blogsVar = <BlogDetails />;
  if (showCourses) coursesVar = <CourseDetails />;

  return (
    <div className="app-wrapper">
      {/* App Header */}
      <header className="app-header">
        <div className="header-logo">
          <span>📝</span> BloggerApp
        </div>
        <div className="header-subtitle">
          Conditional Rendering & List Extraction Laboratory
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="dashboard-grid">
        {/* Left Side Control Panel */}
        <section className="control-panel">
          
          {/* Section 1: Toggle Components */}
          <div className="panel-section">
            <div className="section-label">Toggle Components</div>
            <div className="toggle-group">
              <label className="toggle-item">
                <span>Book Details</span>
                <span className="switch">
                  <input 
                    type="checkbox" 
                    checked={showBooks} 
                    onChange={() => setShowBooks(!showBooks)}
                  />
                  <span className="slider"></span>
                </span>
              </label>
              
              <label className="toggle-item">
                <span>Blog Details</span>
                <span className="switch">
                  <input 
                    type="checkbox" 
                    checked={showBlogs} 
                    onChange={() => setShowBlogs(!showBlogs)}
                  />
                  <span className="slider"></span>
                </span>
              </label>
              
              <label className="toggle-item">
                <span>Course Details</span>
                <span className="switch">
                  <input 
                    type="checkbox" 
                    checked={showCourses} 
                    onChange={() => setShowCourses(!showCourses)}
                  />
                  <span className="slider"></span>
                </span>
              </label>
            </div>
          </div>

          {/* Section 2: Conditional Rendering Selection */}
          <div className="panel-section">
            <div className="section-label">Rendering Technique</div>
            <div className="radio-group">
              {[
                { id: 'ternary', label: 'Ternary Operator ( ? : )' },
                { id: 'logical-and', label: 'Logical AND ( && )' },
                { id: 'variables', label: 'Element Variables' },
                { id: 'if-else', label: 'If-Else Subroutine' },
                { id: 'switch-case', label: 'Switch-Case Block' },
                { id: 'null-return', label: 'Prevent with Null Return' },
              ].map(method => (
                <label 
                  key={method.id} 
                  className={`radio-item ${renderMethod === method.id ? 'active' : ''}`}
                >
                  <input 
                    type="radio" 
                    name="rendering-method"
                    value={method.id}
                    checked={renderMethod === method.id}
                    onChange={(e) => setRenderMethod(e.target.value)}
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side Content & Live Preview */}
        <section className="display-area">
          {/* Part A: Active Code Snippet */}
          <div className="code-viewer-card">
            <div className="code-header">
              <span>Active Conditional Logic</span>
              <span className="code-badge">{renderMethod.replace('-', ' ')}</span>
            </div>
            <pre className="code-content">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>

          {/* Part B: Live Render Output */}
          <div className="renderer-card">
            <div className="section-label" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              Live Render Output
            </div>

            {/* Check if no components are active */}
            {!showBooks && !showBlogs && !showCourses && renderMethod !== 'if-else' && renderMethod !== 'switch-case' ? (
              <div className="empty-renderer">
                <span className="empty-icon">👻</span>
                <h3>Nothing Rendered</h3>
                <p>Toggle any component in the sidebar to inspect dynamic conditional insertion.</p>
              </div>
            ) : (
              <>
                {/* Method 1: Ternary Operator */}
                {renderMethod === 'ternary' && (
                  <>
                    {showBooks ? <BookDetails /> : null}
                    {showBlogs ? <BlogDetails /> : null}
                    {showCourses ? <CourseDetails /> : null}
                  </>
                )}

                {/* Method 2: Logical AND */}
                {renderMethod === 'logical-and' && (
                  <>
                    {showBooks && <BookDetails />}
                    {showBlogs && <BlogDetails />}
                    {showCourses && <CourseDetails />}
                  </>
                )}

                {/* Method 3: Element Variables */}
                {renderMethod === 'variables' && (
                  <>
                    {booksVar}
                    {blogsVar}
                    {coursesVar}
                  </>
                )}

                {/* Method 4: If-Else Subroutine */}
                {renderMethod === 'if-else' && renderWithIfElse(showBooks, showBlogs, showCourses)}

                {/* Method 5: Switch-Case Subroutine */}
                {renderMethod === 'switch-case' && (
                  <>
                    {['books', 'blogs', 'courses'].map(type => {
                      if (type === 'books' && showBooks) return renderSwitchCase('books');
                      if (type === 'blogs' && showBlogs) return renderSwitchCase('blogs');
                      if (type === 'courses' && showCourses) return renderSwitchCase('courses');
                      return null;
                    })}
                  </>
                )}

                {/* Method 6: Null Return Prevention */}
                {renderMethod === 'null-return' && (
                  <>
                    <NullReturnWrapper show={showBooks}>
                      <BookDetails />
                    </NullReturnWrapper>
                    <NullReturnWrapper show={showBlogs}>
                      <BlogDetails />
                    </NullReturnWrapper>
                    <NullReturnWrapper show={showCourses}>
                      <CourseDetails />
                    </NullReturnWrapper>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Lab Theory & Objectives Section */}
      <section className="learning-center">
        <h3 className="learning-title">Lab Theory & Core Objectives</h3>
        
        <div className="learning-grid">
          
          <div className="learning-card">
            <h4><span>🧩</span> Ways of Conditional Rendering</h4>
            <p>React builds on vanilla JavaScript to control output layouts. Key patterns include:</p>
            <ul>
              <li><strong>Ternary Operator:</strong> Concise inline check (`condition ? A : B`).</li>
              <li><strong>Logical AND:</strong> Evaluates right side only if left is truthy (`condition && A`).</li>
              <li><strong>Variables:</strong> Stores JSX nodes in variables to keep return statements clean.</li>
              <li><strong>If-Else / Switch:</strong> Standard control structures placed inside subroutines.</li>
              <li><strong>Null Return:</strong> Returning `null` directly cancels element rendering.</li>
            </ul>
          </div>

          <div className="learning-card">
            <h4><span>🔗</span> Lists and the map() Function</h4>
            <p>
              To render multiple similar components dynamically, React relies on the native JS <code>Array.prototype.map()</code> function.
              This function traverses lists and transforms raw JavaScript objects into markup blocks.
            </p>
            <p>
              <strong>Rendering Multiple Components:</strong> JSX handles arrays of elements directly, parsing them sequentially onto the page.
            </p>
          </div>

          <div className="learning-card">
            <h4><span>🔑</span> The Importance of Keys</h4>
            <p>
              React requires a special string attribute called <strong>key</strong> on sibling elements generated from map loops.
            </p>
            <ul>
              <li><strong>Reconciliation:</strong> Keys help React identify which items have changed, been added, or been removed.</li>
              <li><strong>State Integrity:</strong> Proper keys prevent component state mismatches during re-ordering or item updates.</li>
              <li><strong>Correct Extraction:</strong> The key MUST be declared directly in the <code>map()</code> loop, not embedded inside the child components wrapper.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
