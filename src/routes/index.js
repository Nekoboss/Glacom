import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from '../component/Navbar/Main'
import Footer from '../component/Footer/Main'
import Home from '../component/Home/Main'
import Read from '../component/Read/Main'
import Add from '../component/Add/Main'


const Routing = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read/:slug" element={<Read />} />
        <Route path="/add-post" element={<Add />} />
      </Routes>
      {<Footer />}
    </>
  )
}

export default Routing