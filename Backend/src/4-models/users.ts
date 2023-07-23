//אובייקט משתמש
class UsersModel {

    public UserCode:number;
    public FirstName: String;
    public LastName:String;
    public Email: String;
    public Password: String;
    public UserType:number;


    //בנאי
    public constructor(UsersModel: UsersModel) {
        this.UserCode = UsersModel.UserCode;
        this.FirstName = UsersModel.FirstName;
        this.LastName= UsersModel.LastName;
        this.Email= UsersModel.Email;
        this.Password= UsersModel.Password;
        this.UserType= UsersModel.UserType;

    }
    
}

export default UsersModel;