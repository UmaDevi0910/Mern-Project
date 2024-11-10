const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const registerModel = require("./models/structure");
const Employee = require("./models/employee1");


const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect("mongodb://localhost:27017/mern");

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await registerModel.findOne({ email: email });
  
      if (!user) {
        // If no user is found, send an error response
        return res.json({ success: false, message: "No record exists for this email" });
      }
  
      // Check if the provided password matches the stored password
      if (user.password !== password) {
        return res.json({ success: false, message: "The password is incorrect" });
      }
  
      // If credentials are correct, generate a token and send success response
      const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });
      res.json({ success: true, token });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });


  // Middleware to verify token and extract user ID
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, "yourSecretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};

// Endpoint to get user details
app.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await registerModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/getUsers', (  req,res) => {
  Employee.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.post("/register", async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    // Check if the email already exists
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is already registered" });
    }

    // If email is not registered, create a new user
    const newUser = await registerModel.create({ name, email, password, confirmPassword });
    res.json(newUser);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Add the following route in index.js

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use unique filename
  },
});

const upload = multer({ storage: storage });

// In the route, add upload.single() to handle file upload
app.post("/employee", async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;
  
  // Validate the data
  if (!name || !email || !mobileNo || !designation || !gender || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course // Store the image file path in the database
    });

    await newEmployee.save();
    res.status(201).json({ success: true, message: "Employee data saved successfully" });
  } catch (err) {
    console.error("Error saving employee data:", err);
    res.status(500).json({ error: "Failed to save employee data" });
  }
});


app.listen(3001, () => {
  console.log("Server is running");
});
