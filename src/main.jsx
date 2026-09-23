import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Global Error Boundary to catch white screens
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'system-ui', color: 'red' }}>
          <h2>Something went wrong (React Crash).</h2>
          <details style={{ whiteSpace: 'pre-wrap', background: '#fee', padding: '10px' }}>
            <summary>Click to view error details</summary>
            <p><strong>{this.state.error && this.state.error.toString()}</strong></p>
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Clear Data & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Also catch raw JS errors
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `<div style="padding:20px; color:red; font-family:sans-serif;">
      <h2>Critical JavaScript Error</h2>
      <p><b>Message:</b> ${event.message}</p>
      <p><b>File:</b> ${event.filename}:${event.lineno}</p>
    </div>`;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
