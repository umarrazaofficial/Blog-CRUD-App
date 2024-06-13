import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = {email: email, password: password};
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.post("http://localhost:5000/login",state); 
    if(response.data.name)
    {
    localStorage.setItem('user',JSON.stringify(state))
     navigate('/')
    }else{
        alert("Invalid Email or Password")
    }
  };
  return (
    <div style={{ display: 'flex',flexDirection: 'column', alignItems:'center', paddingTop:'50px'}}>
        <h1>Login</h1>
       <form class="row g-3" style={{ display: 'flex', justifyContent:'center'}} onSubmit={handleSubmit}>
        
        <div class="col-md-8">
          <label for="inputemail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputemail4"
            placeholder="Enter Your Email:"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="col-md-8">
          <label for="inputpassword4" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputpassword4"
            placeholder="Enter Your Password:"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        

        <div class="col-8">
          <button type="submit" class="btn btn-primary">
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login