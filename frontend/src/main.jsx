import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyPostContextProvider from './contexts/MyPostContextProvider.jsx'
import NavBarContextProvider from './contexts/NavBarContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NavBarContextProvider>
    <MyPostContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </MyPostContextProvider>
  </NavBarContextProvider>
)
