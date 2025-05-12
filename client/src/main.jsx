import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './config/authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App/>
  </AuthProvider>
)
