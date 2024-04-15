require('./config/dotenv')
const express = require('express');
const router = express.Router();
const app = express();
const multer=require('multer')
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboard');
const { connectToDatabase } = require('./config/database');
const { Requests } = require('./models/requests');

app.use(cors()); 

app.use(express.json());

// Connect to MongoDB
// Connect to MongoDB
connectToDatabase();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images');
    },filename: function (req, file, cb) {
        cb(null, file.originalname); 
      }
  })
 
  const upload = multer({ storage: storage });
//   app.use(multer({ storage: storage }))
  router.post('/api/submit-request', upload.single('image'), async (req, res) => {
    console.log("Request received");
    try {
      const { productName, price, productDescription, email,productId } = req.body;
      const image = req.file ? req.file.path : null; // Get the path of the uploaded image file
  
      // Create a new Product document
      const newRequest = new Requests({
        productName,
        price,
        productDescription,
        image,
        email,
        productId
      });
  
      // Save the product to the database
      await newRequest.save();
  
      res.status(201).json({ message: 'Product request submitted successfully' });
    } catch (error) {
      console.error('Error submitting product request:', error);
      res.status(500).json({ error: 'Failed to submit product request' });
    }
  });

  app.use('/', router); 

// Routes
app.use('/', authRoutes);
app.use('/',dashboardRoutes);






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
