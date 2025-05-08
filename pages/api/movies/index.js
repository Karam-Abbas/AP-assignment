import fs from "node:fs";
import path from "path";
// import axios from "axios";
// import clientPromise from "@/lib/mongodb";
export default async function handler(req, res) {
  // const client = await clientPromise;
  // const db = client.db(); // Default DB in URI
  // const movies = await db.collection("Movies").find({}).toArray();
  // console.log(JSON.parse(movies));
    const p = path.join(process.cwd(),'data','data.json')
    const data = fs.readFileSync(p)
    const allMovies = JSON.parse(data);
  if (req.method === "GET") {
    res.status(200).json(allMovies.movies);
  }
}
