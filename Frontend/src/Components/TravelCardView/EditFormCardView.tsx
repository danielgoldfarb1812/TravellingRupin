import React, { useEffect, useState } from 'react';
import "./EditFormCardView.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HollidayModel from '../../Models/HollidayModel';
import CompanyService from '../../Services/CompanyService';
import UserType from '../../Models/UserType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//עריכת חופשות
interface AppProps {
  authType: number;
  holliday: HollidayModel;
}
const EditFormCardView: React.FC<AppProps> = ({authType, holliday}) => {
  console.log('EditFormCardView recieved: ', authType);
  const [hollidayState, setHolliday] = useState<HollidayModel>({
    HollidayCode: 0,
    Destination: '',
    Description: '',
    StartDate: new Date(),
    EndDate: new Date(),
    Price: 0,
    NamePhotoFile: '',
  });
  
  const [price, setPrice] = useState(0);
  useEffect(() => {
    console.log("Edit recieve: " + JSON.stringify(holliday));
    if (holliday) {
      const hollidayModel = {
        ...holliday,
        StartDate: new Date(holliday.StartDate),
        EndDate: new Date(holliday.EndDate)
      }
      console.log("Convertde holliday: " + JSON.stringify(hollidayModel));
      setHolliday(hollidayModel);
    }
  }, [holliday]);
  

  const handleSave = async () => {
    console.log('Save: ', JSON.stringify(hollidayState));
    const isSucceeded = await CompanyService.updateHolliday(hollidayState);
    //if (isSucceeded) {
      toast.success('The update succeeded', {
        position: toast.POSITION.TOP_CENTER,
      });
     // alert('The update succeeded');
   // }
  };

  const handleCancel = () => {
    // Handle the cancel action here
    console.log('Cancel');
  };

  return (
    <div> 

      {authType === UserType.NoAccess && (
        <div>
          <p>You are not authorized to access this page!!!!!</p>
        </div>
      )}
      {(authType === UserType.Regular || authType === UserType.Extended) && (
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Edit Card</h3>
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
      )}
   </div>
  );
};

export default EditFormCardView;
