//אובייקט מסוג שגיאת קליינט
export class ClientError {
    public status: number;
    public message: string;
    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}
//אובייקט מסוג שגיאה אשר לא נמצא מזהה ייחודי של מסמך
export class IdNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `id ${id} not found`);
    }
}

// אובייקט מסוג שגיאה אשר לא נמצא ניתוב מתאים
export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(404, `route ${route} not found`);
    }
}
// אובייקט מסוג שגיאת אימות
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message);
    }
}

//כל אובייקט יורש מClientError
//כל אובייקט מייצג שגיאה בצד הלקוח
