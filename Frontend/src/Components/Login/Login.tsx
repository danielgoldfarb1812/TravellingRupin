import "./Login.css";
import CompanyService from "../../Services/CompanyService";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the main Login component
const Login = ({ handleAuthentication }: { handleAuthentication: (authenticatedType: number) => void }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
     
      const emailInput = document.getElementById('emailInput')  as HTMLInputElement;;
      const email = emailInput.value;

      const passwordInput = document.getElementById('passwordInput')  as HTMLInputElement;;
      const  password = passwordInput.value;

      const res = await CompanyService.checkUser(email, password);
      handleAuthentication(res); 
    };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>          
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              id="emailInput"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              id="passwordInput"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="mb-3">
          Need to <a href="register">register?</a>
          </div>
        </div>
      </form>
    </div>
  )
};



export default Login;

