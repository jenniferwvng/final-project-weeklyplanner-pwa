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
import Statistics from './Statistics'

const Navbar = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Router>
    <header>
    <nav>
        <ul style={{display: 'flex', listStyle: 'none', justifyContent: 'center'}}>
        <li style={{margin: '30px', backgroundColor: 'pink'}}>
          <Link to="/" style={{textDecoration: 'none'}} >Weekly</Link>
        </li>
        <li style={{margin: '30px', backgroundColor: 'pink'}}>
          <Link to="/statistics" style={{textDecoration: 'none'}} >Statistics</Link>
        </li>
        <li style={{margin: '30px', backgroundColor: 'pink'}}>
          <Link to="/userpage" style={{textDecoration: 'none'}} >User page</Link>
        </li>
        </ul> 
      </nav>
      </header>

      <Routes>
        <Route path="/" element={<Weekly/>}></Route>
        <Route path="/statistics" element={<Statistics/>}></Route>
        <Route path="/userpage" element={<Userpage/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default Navbar;
