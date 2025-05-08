import fs from "node:fs";
import path from "path";
export default function handler(req, res) {
    const p = path.join(process.cwd(),'data','data.json')
    const data = fs.readFileSync(p)
    const allMovies = JSON.parse(data);
  if (req.method === "GET") {
    const  id  = req.query.id
    const movie = allMovies.movies.find((m)=>m.id===id);
    res.status(200).json(movie);
  }
}
