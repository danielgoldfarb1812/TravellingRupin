// אובייקט חופשה
class HollidayModel {
    public HollidayCode: number;
    public Destination: String;
    public Description:String;
    public StartDate: Date;
    public EndDate: Date;
    public Price:number;
    public NamePhotoFile:String;

    //בנאי
    constructor(obj: any) {
        console.log("Holliday constructor: " + JSON.stringify(obj));
        // Manually map _id to HollidayCode as a string
        if (obj._id !== undefined) {
            // Manually map _id to HollidayCode as a string
            this.HollidayCode = obj._id.toString();
          } else {
            // If _id is undefined, assign 0 to HollidayCode
            this.HollidayCode = obj.HollidayCode;
          }
        this.Destination = obj.Destination;
        this.Description = obj.Description;
        this.StartDate = new Date(obj.StartDate);
        this.EndDate = new Date(obj.EndDate);
        this.Price = obj.Price;
        this.NamePhotoFile = obj.NamePhotoFile;
      }   
}
export default HollidayModel;