import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import UsersModel from "../4-models/users";
import HollidayModel from "../4-models/HollidayModel";
import { json } from "stream/consumers";
import { InsertOneResult } from "mongodb";

//הלוגיקה שמאחורי החיבור לדאטאבייס
//שימוש בלוגיקה נוספת לקבלת תוצאות טובות יותר

//לדוגמה - אימות אימייל (פעולה שעדיף לבצע כאן במקום במונגו ישירות)
async function validateEmail(email) {
  //השוואת האמיל של משתמש לאמיל שנשלח כפרמטר באמצעות קוד TS
    const query = { Email: email };
    //קריאה לפונקציה מתוך הdal
    const result = await dal.execute("users", query, "find");  
    //החזרת תשובה
    return !Array.isArray(result) || result.length === 0;
  }
  async function getAllUsers() {
    const query = {};
    const users = await dal.execute("users", query, "find");
    return users;
  }
  
  //ביצוע שאליתא על טבלת המשתמשים לבדיקת הפרטים של אחד מהם
  async function checkUser(email: string, password: string) {
    const hashedPassword = dal.hashPassword(password);
    const query = { Email: email, Password: hashedPassword };
    console.log("checkUser called: ", email + ' ' + hashedPassword);
    const result = await dal.execute("users", query, "find");
    console.log("checkUser ret: ", JSON.stringify(result));
    // No user found - No access (0)
    if (!Array.isArray(result) || result.length === 0) {
      return 0;
    }
    console.log("UserType is: ", result[0].UserType);
    return result[0].UserType;
  }
  async function getAllHollidays() {
    const query = {};
    const holidays = await dal.execute("hollidays", query, "find") as any[];
    //console.log("getAllHollidays returns: " + JSON.stringify(holidays));
    const holidayModels = holidays.map((obj: any) => new HollidayModel(obj));
    console.log("getAllHollidays holidayModels returns: " + JSON.stringify(holidayModels));
    return holidayModels;
  }
 
  async function addUsers(user) {    
    const hashedPassword = dal.hashPassword(user.Password);
    user.Password = hashedPassword;
    const collectionName = "users";
    const result = await dal.execute(collectionName, {}, "insert", user);
    user.UserCode = result;
    return user;
  }
  
  async function insertHolliday(holidayModel){
    const model = {
      "HollidayCode": holidayModel.HollidayCode,
      "Destination": holidayModel.Destination,
      "Description": holidayModel.Description,
      "StartDate": new Date(holidayModel.StartDate),
      "EndDate": new Date(holidayModel.EndDate),
      "Price": holidayModel.Price,
      "NamePhotoFile": holidayModel.NamePhotoFile,
    };
  
    try {   
      console.log("insertHolliday sends: " + JSON.stringify(model));
      const result = await dal.execute("hollidays", {}, "insert", model);     
      holidayModel.HollidayCode = result;
      console.log("insertHolliday got: " + JSON.stringify(holidayModel));
      return holidayModel; 
    } catch (err) {
      console.error("Error inserting holiday:", err);
      throw err;
    }
  }
  
  async function updateHolliday(holidayModel) {
    const model = {
      "HollidayCode": holidayModel.HollidayCode,
      "Destination": holidayModel.Destination,
      "Description": holidayModel.Description,
      "StartDate": new Date(holidayModel.StartDate),
      "EndDate": new Date(holidayModel.EndDate),
      "Price": holidayModel.Price,
      "NamePhotoFile": holidayModel.NamePhotoFile,
    };

    try {        
      const isUpdated = await dal.execute("hollidays", {}, "update", model);
      console.log("updateHolliday got: " + isUpdated);
    } catch (err) {
      console.error("Error inserting holliday:", err);
      throw err;
    }
  }

  //ייצוא כל הפונקציות לשימוש בקבצים נוספים
export default {
    validateEmail,
    checkUser,
    getAllUsers,
    addUsers,
    getAllHollidays,
    updateHolliday,
    insertHolliday
};