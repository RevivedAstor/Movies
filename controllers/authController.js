const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');

// register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }
    // user already exists chech
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered." });
    }
    // hash
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(password, saltRounds);

    // create and save
    const newUser = await User.create({ name, email, password: hashedPwd });
    // could auto-login here
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered", user: { _id: newUser._id, email: newUser.email, name: newUser.name }, token });
  } catch (err) {
    next(err); // pass errors to the error handler
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // campare passwords with saved hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // password is correct - create a JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};
