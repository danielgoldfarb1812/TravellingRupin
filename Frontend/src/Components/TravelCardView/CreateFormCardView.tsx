import React, { useEffect, useState } from 'react';
import "./EditFormCardView.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HollidayModel from '../../Models/HollidayModel';
import CompanyService from '../../Services/CompanyService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// מסך יצירת חופשה
interface AppProps {
  authType: number;
}
const CreateFormCardView: React.FC<AppProps> = ({authType}) => {
  console.log('CreateFormCardView called');
  const [hollidayState, setHolliday] = useState<HollidayModel>({
    HollidayCode: 0,
    Destination: '',
    Description: '',
    StartDate: new Date(),
    EndDate: new Date(),
    Price: 0,
    NamePhotoFile: '',
  });
  
  const handleSave = async () => {
    console.log('Insert: ', JSON.stringify(hollidayState));
    const isSucceeded =  await CompanyService.insertHolliday(hollidayState);   
    if(isSucceeded)
    //alert('The insert succeeded'); 
    toast.success('The insert succeeded!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCancel = () => {
    // Handle the cancel action here
    console.log('Cancel');
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Add Card</h3>
          <div className="mb-3">
            <label>Image</label>
            <input
              type="text"
              value={hollidayState.NamePhotoFile}
              onChange={(e) => setHolliday((prevState) => ({ ...prevState, NamePhotoFile: e.target.value }))}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Destination name</label>
            <input
              type="text"
              value={hollidayState.Destination}
              onChange={(e) => setHolliday((prevState) => ({ ...prevState, Destination: e.target.value }))}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              value={hollidayState.Description}
              onChange={(e) => setHolliday((prevState) => ({ ...prevState, Description: e.target.value }))}
              className="form-control"
            />
          </div>
          {/* <div className="mb-3">
            <label>Followers number</label>
            <input
              type="number"
              value={hollidayState.Followers}
              onChange={(e) => setFollowers(parseInt(e.target.value))}
              className="form-control"
            />
          </div> */}
          <div className="mb-3">
            <label>Start Date</label>
            <DatePicker
              selected={hollidayState.StartDate}
              onChange={(date) => setHolliday((prevState) => ({ ...prevState, StartDate: date }))}
              className="form-control date-picker"
            />
            
          </div>
          <div className="mb-3">
            <label>End Date</label>
            <DatePicker
              selected={hollidayState.EndDate}
              onChange={(date) => setHolliday((prevState) => ({ ...prevState, EndDate: date }))}
              className="form-control date-picker"
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              value={hollidayState.Price}
              onChange={(e) => setHolliday((prevState) => ({ ...prevState, Price: +e.target.value }))}
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>            
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateFormCardView;
