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
    <div style={{display: 'flex', flexDirection: 'column', backgroundImage: 'linear-gradient(360deg, rgba(9,38,121,0.35477941176470584) 32%, rgba(255,139,0,0.0718662464985994) 98%)' }}>
    <Router>
    <header>
    <nav>
        <ul style={{display: 'flex', listStyle: 'none', justifyContent: 'center'}}>
        <li style={{margin: '30px', padding: '10px', backgroundColor: '#71716F', borderRadius: '15px'}}>
          <Link to="/" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}} >Weekly</Link>
        </li>
        <li style={{margin: '30px', padding: '10px', backgroundColor: '#71716F', borderRadius: '15px'}}>
          <Link to="/statistics" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}} >Statistics</Link>
        </li>
        <li style={{margin: '30px', padding: '10px', backgroundColor: '#708090', borderRadius: '15px'}}>
          <Link to="/userpage" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}} >User page</Link>
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
