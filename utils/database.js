// import mongoose from "mongoose";

// let isConnected = false; //track the connection

// export const connectToDB = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("MongoDB is already connected");

//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "postBook",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
