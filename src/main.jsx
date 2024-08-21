import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StoreProvider } from './components/Store.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
<StoreProvider>
    <App />
  </StoreProvider>,
)
