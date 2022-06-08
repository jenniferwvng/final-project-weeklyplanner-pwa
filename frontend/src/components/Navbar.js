import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

// import styled from 'styled-components';

import Userpage from './Userpage';
import Weekly from './Weekly';
import Daily from './Daily';
import Statistics from './Statistics'

const Navbar = () => {
  return (
    <>
    <Router>
    <header>
    <nav>
        <ul>
        <li>
          <Link to="/">Weekly</Link>
        </li>
        <li>
          <Link to="/daily">Today</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
        <li>
          <Link to="/userpage">User page</Link>
        </li>
        </ul> 
      </nav>
      </header>

      <Routes>
        <Route path="/" element={<Weekly/>}></Route>
        <Route path="/daily" element={<Daily/>}></Route>
        <Route path="/statistics" element={<Statistics/>}></Route>
        <Route path="/userpage" element={<Userpage/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default Navbar;
