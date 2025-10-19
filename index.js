const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes');
const path = require('path')




 // Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Route
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));


app.get("/", (req,res) => {
  res.send("<h1>Welcome to Suby</h1>");
});


// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started running at port ${PORT}`);
});
