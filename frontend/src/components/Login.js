import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


const Login = () => {

  var loginEmail;
  var loginPassword;
  const [ loggedIn, setLogin ] = useState(false);

  const doLogin = async event => {
    event.preventDefault();

    var json = JSON.stringify({username: loginEmail.value, password: loginPassword.value});

    try {
      const response = await fetch('http://localhost:5000/api/login', 
        {method:'POST', body: json, headers:{'Content-Type': 'application/json'}});
      
      var res = JSON.parse(await response.text());

      if (res.error === "none") 
        setLogin(true);
      else 
        alert(res.error);
    } catch (e) {
      alert(e);
    }

  }

    return ( loggedIn === false ? (
        <div className="login">
            
        <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Enter email" ref={(c) => loginEmail = c}/>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Control type="password" placeholder="Password" ref={(c) => loginPassword = c}/>
    </Form.Group>
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary"  onClick={doLogin}>
      Submit
    </Button>
  </Form>
      </div>) : <h1>You are already logged in</h1>
    );
}


export default Login;