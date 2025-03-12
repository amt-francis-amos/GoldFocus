import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const generateAccountID = async () => {
  let accountID;
  let isUnique = false;

  while (!isUnique) {
    accountID = Math.floor(100000 + Math.random() * 900000); 
    const existingUser = await User.findOne({ accountID });
    if (!existingUser) isUnique = true;
  }

  return accountID;
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const accountID = await generateAccountID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      accountID,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Details",
      text: `Welcome! Your Account ID is ${accountID}.\nUse this ID and your password to log in.`,
    };

    await transporter.sendMail(mailOptions);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      message: "User registered successfully. Check your email for your Account ID.",
      token,
      user: {
        id: newUser._id,
        accountID: newUser.accountID,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { accountID, password } = req.body;

    if (!accountID || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ accountID });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        accountID: user.accountID,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
