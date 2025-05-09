import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const movies = await db.collection("Movies").find({}).toArray();
  const directors = await db.collection("Directors").find({}).toArray();
  if (req.method === "GET") {
    const id = req.query.id;
    // find the director id from the movie's id
    const directorId = movies.find((m) => m.id === id).directorId;
    // find the director through the director id found above
    const director = directors.find((i) => i.id === directorId);
    res.status(200).json(director);
  }
}
