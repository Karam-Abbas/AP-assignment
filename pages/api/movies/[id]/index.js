import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const movies = await db.collection("Movies").find({}).toArray();
  if (req.method === "GET") {
    const id = req.query.id;
    const movie = movies.find((m) => m.id === id);
    res.status(200).json(movie);
  }
}
