class HollidayModel {
    public HollidayCode:number;
    public Destination: string;
    public Description:string;
    public StartDate: Date;
    public EndDate: Date;
    public Price:number;
    public NamePhotoFile:string;

    public constructor(hollidayModel: HollidayModel) {
        this.HollidayCode = hollidayModel.HollidayCode;
        this.Destination = hollidayModel.Destination;
        this.Description= hollidayModel.Description;
        this.StartDate= hollidayModel.StartDate;
        this.EndDate= hollidayModel.EndDate;
        this.Price= hollidayModel.Price;
        this.NamePhotoFile= hollidayModel.NamePhotoFile;
    }    
}
export default HollidayModel;