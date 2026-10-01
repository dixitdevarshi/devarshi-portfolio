import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
const preserveProjectHash = sessionStorage.getItem('return-to-projects') === '1'
if (preserveProjectHash) {
  sessionStorage.removeItem('return-to-projects')
} else if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
