import express from "express";
import cors from "cors";
import records from "./routes/books.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/book", records);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});