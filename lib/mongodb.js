// lib/mongodb.js
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";

configDotenv();
const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable so the client is preserved across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
