import React, { useState } from 'react';

const Userpage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signinPassword, setSigninPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');


const loginStateMessage = async () => {
  try {
    const response = await fetch('http://localhost:8080/secrets', {
        method: 'POST',
        headers: {                
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({email: email})
    });
    const authorizedLogin = await response.json();
    console.log(authorizedLogin);              
     
  } catch(err) {
    console.error(err);
  }
}

  const validateSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/signin', {
          method: 'POST',
          headers: {                
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: signinEmail, password: signinPassword})
      });
      const authorizedLogin = await response.json();
      sessionStorage.setItem('accessToken', authorizedLogin.accessToken);   
      console.log(authorizedLogin);              
       
    } catch(err) {
      console.error(err);
    }
  }

  const validateSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
          headers: {                    
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: username, email: email, password: password})
      });
      
      const signupInfo = await response.json();
      console.log(signupInfo);
      sessionStorage.setItem('accessToken', signupInfo.accessToken);
      
    } catch(err) {
      console.error(err);
    }
  }

  const SignoutUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/signout');
      const authorizedLogin = await response.json();
      sessionStorage.removeItem('accessToken');
      console.log(authorizedLogin);
        
    } catch(err) {
      console.error(err);
    }
  }



  return (
    <div>
      <h1>Userpage page</h1>
      <form onSubmit={validateSignUp} style={{border: '1px solid black'}}>
        <h1>Signup</h1>
      <label>
          <p>Username:</p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
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
                
      <form onSubmit={validateSignin} style={{border: '1px solid black'}}>
        <h1>Signin</h1>
        <label>
            <p>Email:</p>
            <input type="text" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} />
        </label>
        <label>
            <p>Password:</p>
            <input type="text" value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        
        <div>
        <button onClick={SignoutUser}>Sign out</button>
        </div> 

        <div>
          <button onClick={loginStateMessage}>Check login status</button>
        </div>
    </div>
  );
}

export default Userpage;
