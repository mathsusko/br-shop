import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css' // Importando o arquivo de estilos globais
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
