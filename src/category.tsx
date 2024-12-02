import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Signals from './Signals.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Signals />
  </StrictMode>,
)
