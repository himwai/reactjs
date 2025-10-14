import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './test-index.css'
import App from './test-App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
