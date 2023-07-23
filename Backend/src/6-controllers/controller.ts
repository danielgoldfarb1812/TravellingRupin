import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/logic";
import UsersModel from "../4-models/users";
import HollidayModel from "../4-models/HollidayModel";
//הקובץ הזה מבצע את הפעולות שכתבנו בקובץ logic
//דרכו אנחנו שולחים בקשות לדאטאבייס ומקבלים תשובות
const router = express.Router();

// GET http://localhost:3001/api/validateEmail/?mailName=a@a.com";
router.get("/api/validateEmail/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const mailName = request.query.mailName.toString();
        console.log('Server side email: ' + mailName);
        const isMailValid = await logic.validateEmail(mailName);
        response.json(isMailValid);
      } catch (err: any) {
        next(err);
      }
    });

    
    // GET http://localhost:3001/api/checkUser/?mailName=a@a.com&password=111";
    router.get("/api/checkUser/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const mailName = request.query.mailName.toString();
        const password = request.query.password.toString();
        console.log('Server side email: ' + mailName);
        const userType = await logic.checkUser(mailName, password);
        response.json(userType);
      } catch (err: any) {
        next(err);
      }
    });


// GET http://localhost:3001/api/users
router.get("/api/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allUsers = await logic.getAllUsers();
        response.json(allUsers);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/api/user", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = new UsersModel(request.body);
        const addUser= await logic.addUsers(users);
        response.status(201).json(addUser);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/api/hollidays", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const allUserCardView = await logic.getAllHollidays();
      response.json(allUserCardView);
  }
  catch (err: any) {
      next(err);
  }
});

router.post("/api/holliday", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const holidayModel = new HollidayModel(request.body);
    const isSucceeded = await logic.updateHolliday(holidayModel);
    response.json(isSucceeded);
  }
  catch (err: any) {
      next(err);
  }
});

router.post("/api/insert-holliday", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const holidayModel = new HollidayModel(request.body);
    const addHolidayModel = await logic.insertHolliday(holidayModel);    
    response.status(201).json(addHolidayModel);
  }
  catch (err: any) {
      next(err);
  }
});

export default router;