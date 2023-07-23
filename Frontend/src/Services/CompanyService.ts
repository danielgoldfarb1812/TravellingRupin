import axios from "axios";
import appConfig from "../Utils/Config";
import UsersModel from "../Models/UserModel";
import HollidayModel from "../Models/HollidayModel";
// אובייקט אשר מדבר עם הapi
// מפה שולחים את כל הבקשות לbackend
//ומקבלים תוצאות לfrontend
class CompanyService {
//דרך axios 
//לארגן בקשה לשרת דרך אינטרנט יגיע לשמה לקבל תשובה 
//בקשה לשרת יכולה להיות משתי סוגים get and post 
//שניהם בקשות:
//post - מאפשר לשלוח ביחד עם בקשה קבצים ודברים יותר כבדים 
//get- למילה או דברים בסיסים
    public async validateEmail(email: string): Promise<boolean> {
        const url = appConfig.validateEmailUrl + `?mailName=${encodeURIComponent(email)}`;
        console.log('Client url : ' + url);
        const response = await axios.get<boolean>(url);
        const res = response.data;
        return res;
    }

    public async checkUser(mailName: string, password: string): Promise<number> {
        debugger
        const url = appConfig.checkUserUrl + `?mailName=${encodeURIComponent(mailName)}&password=${encodeURIComponent(password)}`;
        console.log('Client checkUser url : ' + url);
        const response = await axios.get<number>(url);
        const res = response.data;
        return res;
    }

    public async addUser(user: UsersModel): Promise<void> {
        console.log('Client send user: ' + JSON.stringify(user));
        console.log('Client send user url: ' + appConfig.userUrl);
        const response = await axios.post<UsersModel>(appConfig.userUrl, user);       
    }
     // GET
    public async getAllHollidays(): Promise<HollidayModel[]> {
        const response = await axios.get<HollidayModel[]>(appConfig.hollidaysUrl);
        const hollidays = response.data;
        return hollidays;
    }
  // POST
    public async updateHolliday(hollidayModel: HollidayModel): Promise<boolean> {
        const response = await axios.post<boolean>(appConfig.hollidayUrl, hollidayModel);
        const isSucceeded = response.data;
        return isSucceeded;
    }
    public async insertHolliday(hollidayModel: HollidayModel): Promise<boolean> {
        const response = await axios.post<boolean>(appConfig.hollidayInsertUrl, hollidayModel);
        return response.data != null;
    }
    // public async getAllMeetings(): Promise<MeetingsModel[]> {
    //     const response = await axios.get<MeetingsModel[]>(appConfig.meetingsUrl);
    //     const meet = response.data;
    //     return meet;
    // }

    // public async addMeeting(meeting: MeetingsModel): Promise<void> {
    //     const response = await axios.post<MeetingsModel>(appConfig.meetingUrl, meeting);
       
    // }

    // public async deleteMeeting(meetingId: number): Promise<void> {
    //     await axios.delete(appConfig.meetingsUrl + meetingId);
    // }

}

const companyService = new CompanyService();

export default companyService;
