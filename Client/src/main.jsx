import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  /* StrictMode is commented out to prevent double-invocation of 
     voice alerts and lifecycle effects during development.
  */
  // <StrictMode>
    <App />
  // </StrictMode>,
)