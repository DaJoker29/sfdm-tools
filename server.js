import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

connectDB().catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.static("public"));

// Error Handling
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

async function connectDB() {
  await mongoose.connect(process.env.DB);
  console.log(`Connected to database: ${process.env.DB}`);
}
