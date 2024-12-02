import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Signs from './Signs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Signs />
  </StrictMode>,
)
