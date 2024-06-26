import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import BookstoreRoutes from './BookstoreRoutes'

function App() {
  return (
    <BrowserRouter>
      <BookstoreRoutes />
    </BrowserRouter>
  )
}

export default App
