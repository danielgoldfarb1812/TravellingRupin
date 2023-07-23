//הגדרת העמודים
import { Link, Navigate, Route, Router, Routes, useLocation } from "react-router-dom";
 
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import Login from "../../Login/Login";
import Register from "../../Login/Register";
import TravelCardView from "../../TravelCardView/TravelCardView";

import { JSX, useEffect } from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "../../HomeArea/Home/Home";
//import AddMeeting from "../../AddMeeting/AddMeeting";
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import EditFormCardView from "../../TravelCardView/EditFormCardView";
import HollidayModel from "../../../Models/HollidayModel";
import CreateFormCardView from "../../TravelCardView/CreateFormCardView";

function Routing(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(0);
    const [hollidayState, setHolliday] = useState<HollidayModel | null>(null);
 
    const navigate = useNavigate();
    const location = useLocation();
    //Function callback
    // 0 - No authenticated, 1 - regular user, 2 - administrator
    const handleAuthentication = (authenticatedType : number) => {     
      console.log("Authentication pass:", authenticatedType);      
      setIsAuthenticated(authenticatedType);  
      navigate("/travel-card-view");
    };

     
    const handleEditHolliday = (hollidayModel : HollidayModel) => {     
      console.log("HollidayModel pass:", JSON.stringify(hollidayModel));
      setHolliday(hollidayModel);
      const currentLocation = window.location.pathname;

      console.log("CurrentLocation is:", currentLocation);
      navigate("/edit");
  };

    return (
              <div className="App">
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <Routes>
                      <Route path="/" element={<Login handleAuthentication={handleAuthentication} />} />
                      <Route path="/sign-in" element={<Login handleAuthentication={handleAuthentication}/>} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/travel-card-view" element={<TravelCardView authenticatedType={isAuthenticated} handleEditHolliday={handleEditHolliday}/>} />
                      <Route path="/edit" element={<EditFormCardView authType={isAuthenticated} holliday={hollidayState} />} />
                      <Route path="/add-holiday" element={<CreateFormCardView authType={isAuthenticated} />} />
                    </Routes>
                  </div>
                </div>
              </div>
    );
}

export default Routing;
