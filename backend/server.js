const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const commentRoutes = require("./routes/commentRoutes");
const graduateRoutes = require("./routes/graduateRoutes");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI) 
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Adjust if your frontend is on a different port
}));

app.use("/api/user-comments", commentRoutes);
app.use("/api/graduation-records", graduateRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));