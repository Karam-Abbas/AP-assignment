import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const movies = await db.collection("Movies").find({}).toArray();
  if (req.method === "GET") {
    res.status(200).json(movies);
  }
}
