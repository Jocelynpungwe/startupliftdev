import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store.js'
import './styles.css'

import './home.css'
import './styles/business.css'
import './styles/management.css'
import './styles/portfolio.css'
import './styles/luxury-pages.css'
import './styles/luxury-home.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
