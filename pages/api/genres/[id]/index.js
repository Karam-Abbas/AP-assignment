import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const genres = await db.collection("Genres").find({}).toArray();
  if (req.method === "GET") {
    const id = req.query.id;
    const genre = genres.find((g) => g.id === id);
    res.status(200).json(genre);
  }
}
