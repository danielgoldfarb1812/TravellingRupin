import React from 'react';
import "./TravelCardView.css";
import UserCardView from './UserCardView';
import AdminCardView from './AdminCardView';
import HollidayModel from '../../Models/HollidayModel';
import UserType from '../../Models/UserType';
//הצגת החופשות בהתאם ליוזר שמחובר
//אם מחובר אדמין - יציג את הכרטיסיות שאפשר לערוך (2)
//אם יוזר רגיל - יציג לצפייה בלבד (1)
//אחרת יציג הודעה שאין גישה לדף (0)
type TravelCardViewProps = {
    authenticatedType: number;
    handleEditHolliday: (hollidayModel: HollidayModel) => void;
  };
  
  const TravelCardView: React.FC<TravelCardViewProps> = ({ authenticatedType, handleEditHolliday }) => {
  console.log("TravelCardView the Auth type is: " + authenticatedType);
  return (
    <div>
    {authenticatedType === UserType.NoAccess && (
      <div>
        <p>You are not authorized to access this page</p>
      </div>
    )}
    {authenticatedType === UserType.Regular && (     
       <UserCardView/>      
    )}
    {authenticatedType === UserType.Extended && (
      <div className="extended-card-container">
       <AdminCardView  authenticatedType={authenticatedType} handleEditHolliday={handleEditHolliday} />    
      </div>
    )}
  </div>
  );
};

export default TravelCardView;