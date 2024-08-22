import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/item/:id' element={<DetailPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App