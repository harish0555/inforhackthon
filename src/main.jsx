import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TimerProvider } from './context/TimerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </TimerProvider>
  </StrictMode>,
)
