import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './UserCardView.css';
import CompanyService from "../../Services/CompanyService";
import { Link } from 'react-router-dom';
import HollidayModel from '../../Models/HollidayModel';
import { JsxEmit } from 'typescript';
import CardImage1 from '../../Images/i1.jpg';
import CardImage2 from '../../Images/i2.jpg';
//הצגת חופשות למשתמש רגיל
function UserCardView(): JSX.Element {

  
  const [data, setData] = useState<HollidayModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CompanyService.getAllHollidays();    
        console.log('Holllidays are: ' + JSON.stringify(response)); 
        setData(response);
      } catch (error) {
        console.error('Error fetching holiday data:', error);
      }
    }

    fetchData();
  }, []);
  return (
      <div>      
        <div className="card-container">
          {data.map((card) => (
            <div className="card" key={card.HollidayCode}>
              <img src={CardImage1} alt="Card" className="card-image" />
              <div className="card-body">
                <p className="card-description">{card.Description}</p>                 
                <p className="card-dates">{new Date(card.StartDate).toDateString()} - {new Date(card.EndDate).toDateString()}</p>                 
                <p className="card-price">${card.Price}</p>     
               
              </div>
            </div>
          ))}
      </div>  
    </div>
  );
}

export default UserCardView;