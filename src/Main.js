import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Item from 'a/Item'
import Appium from 'portallegacy/appium'

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Item />} /> */}
        <Route path='forgot' element={<Appium />} />
        {/* <Route path="forgot" element={<Item />} /> */}
        {/* <Route path='/forgot' element={<Forgot />} /> */}
        {/* <Route path="/product/:id" component={PDPContent} />
        <Route path="/cart" component={CartContent} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Main