import "./Register.css";
import { useNavigate } from 'react-router-dom';
import CompanyService from "../../Services/CompanyService";
import UsersModel from "../../Models/UserModel";

// Import necessary dependencies
import React, { useState } from 'react';

// Define the main Register component
const Register = () => {
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Check if the password is empty
    if (password === '') {
      alert('Password field cannot be empty');
      return;
    }

    // Check if the password length is less than 4
    if (password.length < 4) {
      alert('Password must be at least 4 characters long');
      return;      
    }
    const emailInput = document.getElementById('emailInputId') as HTMLInputElement;;
    const email = emailInput.value;
    try {       
        let res = await CompanyService.validateEmail(email);
        if (!res) {
          alert('Email in use, please enter other one');
          return;     
        }
      } catch (error) {
        console.log('The service is unavailable');
         // Handle the error
         alert('The service is unavailable');
         return;             
      }
    setIsRegistered(true);

    const firstNameInput = document.getElementById('firstNameInput')  as HTMLInputElement;
    const firstName = firstNameInput.value;
    const lastNameInput = document.getElementById('lastNameInput')  as HTMLInputElement;
    const lastName = lastNameInput.value;

    const user: UsersModel = {
      UserCode: 1,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      UserType: 1,
    };
     await CompanyService.addUser(user);
    // Redirect to the sign-in page after a delay
    setTimeout(() => {
      navigate('/sign-in');
    }, 3000);

  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title-register">Register</h3>
          {isRegistered && (
            <div className="success-message">
              Registration successful! Redirecting to sign-in page...
            </div>
          )}
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              id="firstNameInput"
              className="form-control"
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input type="text" id="lastNameInput" className="form-control" placeholder="Last name" required />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              id="emailInputId"
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password (minimal 4 symbols)"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </div>
          <div className="mb-3">
            Already registered <a href="/sign-in">sign in?</a>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Register;

