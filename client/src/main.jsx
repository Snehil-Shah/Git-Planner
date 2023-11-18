import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// TODO: Set github colour theme and font family
// TODO: Maybe learn tailwind and complete the UI from scratch only after the basic working app is complete using MUI
// BUG: Add loading screen during all async service requests

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
