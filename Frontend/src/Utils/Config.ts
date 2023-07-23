//הגדרות ניתובים לצורך שליחת בקשות לapi
//מבלי לכתוב את הניתובים hard coded
class Config {
    public validateEmailUrl = "http://localhost:3001/api/validateEmail/";
    public checkUserUrl = "http://localhost:3001/api/checkUser/";
    public usersUrl = "http://localhost:3001/api/users/"; //get
    public userUrl = "http://localhost:3001/api/user/"; //post
    public hollidaysUrl = "http://localhost:3001/api/hollidays/"; //get
    public hollidayUrl = "http://localhost:3001/api/holliday/"; //post update
    public hollidayInsertUrl = "http://localhost:3001/api/insert-holliday/"; //post insert
}

const appConfig = new Config();

export default appConfig;
