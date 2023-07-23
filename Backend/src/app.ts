import express from "express";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/controller";
import dal from "./2-utils/dal";
// יצירת השרת
const server = express();

//שימוש בפונקציות ובקונטרולרים שיצרנו קודם
server.use(cors());
server.use(express.json());
server.use("/", controller);
server.use("*", routeNotFound);
server.use(catchAll);

//סגירת החיבור לדאטאבייס בזמן התנתקות מהשרת
process.on('SIGINT', async () => {
    try {
      // Close the database connection before exiting the server
      await dal.closeDatabaseConnection();
      process.exit(0);
    } catch (err) {
      console.error('Error closing database connection:', err);
      process.exit(1);
    }
  });
  
//הפעלת השרת
server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
