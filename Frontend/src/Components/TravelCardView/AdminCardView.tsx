import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './AdminCardView.css';
import CompanyService from "../../Services/CompanyService";
import HollidayModel from '../../Models/HollidayModel';
import CardImage1 from '../../Images/i1.jpg';
import { useNavigate } from 'react-router-dom';
import UserType from '../../Models/UserType';

//הצגת חופשות בהתאם למסך אדמין
type TravelCardViewProps = {
  authenticatedType: number;
  handleEditHolliday: (hollidayModel: HollidayModel) => void;
};

const AdminCardView: React.FC<TravelCardViewProps> = ({ authenticatedType, handleEditHolliday }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<HollidayModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CompanyService.getAllHollidays();
        console.log('Holidays are: ' + JSON.stringify(response));
        setData(response);
      } catch (error) {
        console.error('Error fetching holiday data:', error);
      }
    }

    fetchData();
  }, []);

  const handleEditButtonClick = (hollidayModel: HollidayModel) => {
    handleEditHolliday(hollidayModel);
  };

  const handleAddButtonClick = () => {
    console.log('Add new holiday called in admin page');
    navigate('/add-holiday');
  };

  return (
    <div className="main-container">
      {authenticatedType === UserType.NoAccess && (
        <div>
          <p>You are not authorized to access this page</p>
        </div>
      )}
      {(authenticatedType === UserType.Regular || authenticatedType === UserType.Extended) && (
        <div>
          <div className="add-button-container">
            <button type="submit" className="btn btn-primary" onClick={handleAddButtonClick}>
              Add new holiday
            </button>
          </div>

          <div className="card-container">
            {data.map((card) => (
              <div className="card" key={card.HollidayCode}>
                <img src={CardImage1} alt="Card" className="card-image" />
                <div className="edit-button-container">
                  <button className="edit-oval-button" onClick={() => handleEditButtonClick(card)}>
                    Edit
                  </button>
                </div>
                <div className="card-body">
                  <p className="card-description">{card.Description}</p>
                  <p className="card-dates">
                    {new Date(card.StartDate).toDateString()} - {new Date(card.EndDate).toDateString()}
                  </p>
                  <p className="card-price">${card.Price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCardView;
