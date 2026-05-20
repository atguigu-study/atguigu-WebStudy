import React, { Suspense, lazy } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Loading from './pages/Loading'

const About = lazy(() => import('./pages/About'))
const Home = lazy(() => import('./pages/Home'))

export default function App() {
  return (
    <>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <hr/>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}
