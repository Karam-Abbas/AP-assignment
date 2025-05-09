import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const genres = await db.collection("Genres").find({}).toArray();
  if (req.method === "GET") {
    res.status(200).json(genres);
  }
}
