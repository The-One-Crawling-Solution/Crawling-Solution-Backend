import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://theonecrawlingsolutions:${password}@theonecrawlingsolution.fn6c7.mongodb.net/?retryWrites=true&w=majority&appName=TheOneCrawlingSolution`;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      console.log("MongoDB connection successful");

      db = client.db("the_one_crawling_solution");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw new Error("MongoDB connection error");
    }
  }

  return db;
}

export default connectToDatabase;
