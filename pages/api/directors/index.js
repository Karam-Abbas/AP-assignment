import db from "@/lib/mongodb";
export default async function handler(req, res) {
  const directors = await db.collection("Directors").find({}).toArray();
  if (req.method === "GET") {
    res.status(200).json(directors);
  }
}
