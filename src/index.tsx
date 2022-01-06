import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import EthereumContext from './context/EthereumContext'

ReactDOM.render(
  <React.StrictMode>
    <EthereumContext>
      <App />
    </EthereumContext>
  </React.StrictMode>,
  document.getElementById('root')
)