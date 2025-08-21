import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextListProvider } from './contexts/ContextList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextListProvider>
      <App />
    </ContextListProvider>
  </StrictMode>,
)