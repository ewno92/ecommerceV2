// import mongoose from "mongoose";

// const connectDB = () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("Already connected.");
//     return;
//   }
//   mongoose.connect(
//     process.env.MONGO_URL,
//     {
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err) => {
//       if (err) throw err;
//       console.log("Connected to mongodb.");
//     }
//   );
// };

// export default connectDB;

import mongoose from "mongoose";

const connection = {};
async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connection.readyState;
  console.log("******************database connected******************");
}
export default dbConnect;
