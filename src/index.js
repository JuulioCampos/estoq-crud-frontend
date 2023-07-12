import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { ProductTypeProvider } from './providers/ProductType'
import { LoadingProvider } from './providers/Loading'
import { ProductProvider } from './providers/Product'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ProductTypeProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </ProductTypeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
