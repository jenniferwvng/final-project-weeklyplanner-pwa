import React, { useState } from 'react';

const Userpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/signin', {
          method: 'POST',
          headers: {                
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email})
      });
      const authorizedLogin = await response.json();
      console.log(authorizedLogin);              
       
    } catch(err) {
      console.error(err);
    }
  }

  const SignoutUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/signout');
      const authorizedLogin = await response.json();
      console.log(authorizedLogin);
        
    } catch(err) {
      console.error(err);
    }
  }



  return (
    <div>
      <h1>Userpage page</h1>
      <form onSubmit={validateSignin}>
        <label>
            <p>Email:</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            <p>Password:</p>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        
        <div>
        <button onClick={SignoutUser}>Sign out</button>
        </div> 
    </div>
  );
}

export default Userpage;
