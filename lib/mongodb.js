import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let clientPromise = await client.connect();
const db = clientPromise.db("HouseMovies");
export default db;
