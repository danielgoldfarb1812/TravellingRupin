import { MongoClient, ObjectId, WithId } from "mongodb";
import config from "./config"; //שליפת כל ההגדרות מקובץ נפרד
//חיבור לדאטאבייס
// כתובת הדאטאבייס במונגו
const uri = config.mongoUri; // Assuming you have the MongoDB URI in the config file
let client = new MongoClient(uri);
connectToDatabase();
//פונקציה לחיבור האפליקציה לדאטאבייס
async function connectToDatabase() {
  client = await MongoClient.connect(uri);
}

// פונקציה לסגירת החיבור
async function closeDatabaseConnection() {
  if (client) {
    await client.close();
  }
}

//פונקציה המבצעת שאילתות על הדאטאבייס  באמצעות switch case
async function execute(collectionName: string, query: object, operation: string, data?: any) 
 {
    const collection = client.db(config.mongoDatabase).collection(collectionName);
  
    try {
      console.log("Col name: ", collectionName);
      console.log("Query: ", query);
      console.log("Collection name: ",  collection.collectionName);
      debugger
      switch (operation) {
        case "find":
          return await collection.find(query).toArray();
        case "count":
          return await collection.countDocuments(query);
        case "insert":
          const result = await collection.insertOne(data);
          console.log("insertOne returns", JSON.stringify(result.insertedId));
          return result.insertedId;
        case "update":
              const { HollidayCode, ...updateData } = data;
               console.log("HollidayCode is ", HollidayCode);
               console.log("HollidayCode length is ", HollidayCode.length);
              const objectId = ObjectId.createFromHexString(HollidayCode);
              const updateResult = await collection.updateOne(
                  { _id: objectId },
                  {
                      $set: updateData
                  }
              );
              return updateResult.modifiedCount === 1;
        default:
          throw new Error("Invalid operation provided.");
      }
      
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }   
  }
 
  //ייצוא הפונקציות לשאר האפליחקציה
  export default {
    execute,
    closeDatabaseConnection
  };