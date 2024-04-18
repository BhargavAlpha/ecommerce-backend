require('./config/dotenv')
const express = require('express');
const router = express.Router();
const app = express();
const path = require("path");
const multer=require('multer')
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboard');
const { connectToDatabase } = require('./config/database');
const { Requests } = require('./models/requests');

app.use(cors()); 

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.urlencoded({ extended: true }));
connectToDatabase();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "images");
  },
  filename: (req, file, cb) => {
      cb(null, req.body.img);
  }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image uploaded successfully!");
});

  app.use('/', router); 

// Routes
app.use('/', authRoutes);
app.use('/',dashboardRoutes);






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
