import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Homepage from './pages/Homepage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
)
