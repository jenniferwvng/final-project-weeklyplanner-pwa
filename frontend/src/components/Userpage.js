import React, { useState, useEffect } from 'react';

const Userpage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signinPassword, setSigninPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  const [signinStatus, setSigninStatus] = useState('');


  useEffect(() => {
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
        const loginStatusMessage = authorizedLogin.loginData;
        console.log(loginStatusMessage)
        setLoginStatus(loginStatusMessage);
         
      } catch(err) {
        console.error(err);
      }
    }
    loginStateMessage();
  }, [loginStatus, signinStatus, email])



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
      setSigninStatus(authorizedLogin);       
       
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
      setSigninStatus(signupInfo);
      
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
      setSigninStatus(authorizedLogin)
        
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <span style={{textAlign: 'center', color: '#708090', textTransform: 'uppercase'}}>
        <h1>User page</h1>
        <p>{loginStatus}</p>
      </span>
      {loginStatus === 'You are now logged out' ? 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        <form onSubmit={validateSignUp} style={{ border: '3px solid lightblue', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
        <input type="submit" value="Submit" style={{margin: '10px', border: 'none', borderRadius: '15px', padding: '10px', textTransform: 'uppercase'}}/>
        </form>
                  
        <form onSubmit={validateSignin} style={{border: '3px solid lightblue', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1>Signin</h1>
          <label>
              <p>Email:</p>
              <input type="text" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} />
          </label>
          <label>
              <p>Password:</p>
              <input type="text" value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} />
          </label>
          <input type="submit" value="Submit" style={{margin: '10px', border: 'none', borderRadius: '15px', padding: '10px', textTransform: 'uppercase'}}/>
          </form>
          </div>
         : 
          <div style={{textAlign: 'center'}}>
            <div style={{margin: '30px'}}>
              <button onClick={SignoutUser} style={{border: 'none', padding: '15px', borderRadius: '20px', textTransform: 'uppercase'}}>Sign out</button>
            </div>
          </div> 
        }
    </div>
  );
}

export default Userpage;
