import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Note: You might need to change this to './App.tsx' if you convert the App component too.
import './index.css';

// ----------------------------------------------------------------------
// TypeScript setup for ReactDOM.createRoot
// ----------------------------------------------------------------------

// Get the root element from the DOM.
const rootElement = document.getElementById('root');

// Use a guard clause to ensure the root element exists and is an HTMLElement.
if (rootElement) {
  // Use ReactDOM.createRoot to initialize the React application.
  // The '!' non-null assertion operator tells TypeScript that rootElement is definitely not null here.
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  // Log an error if the root element is missing, which helps in debugging.
  console.error("The root element with ID 'root' was not found in the document.");
}