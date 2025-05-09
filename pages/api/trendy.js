import db from "@/lib/mongodb";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const movies = await db.collection("Movies").find({}).toArray();
    // assuming the movies with 8.6 or higher rating are trending one
    const trendyMovies = movies.filter((item) => item.rating >= 8.6);
    res.status(200).json(trendyMovies);
  }
}
