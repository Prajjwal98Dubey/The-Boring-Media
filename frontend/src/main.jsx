import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyPostContextProvider from './contexts/MyPostContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyPostContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </MyPostContextProvider>
)
