import mongoose from "mongoose";

const URI =
  "mongodb+srv://usuario:1234@ssc0904.fhiqlsk.mongodb.net/";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

export default db;
