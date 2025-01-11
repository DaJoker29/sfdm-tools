import express from "express";
import cors from "cors";

const app = express();

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
