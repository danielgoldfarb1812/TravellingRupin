import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../4-models/client-errors";
// פונקציה לבדיקת ניתובים תקינים
function routeNotFound(request: Request, response: Response, next: NextFunction): void {
    const err = new RouteNotFoundError(request.originalUrl);
    next(err); // הפונקציה קופצת לפונקציה אחרת לתפיסת כל השגיאות
}

export default routeNotFound;
