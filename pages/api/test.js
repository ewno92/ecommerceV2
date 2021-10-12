// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../utils/connectDB";

connectDB();

export default async (req, res) => {
  res.json({ test: "test" });
};
