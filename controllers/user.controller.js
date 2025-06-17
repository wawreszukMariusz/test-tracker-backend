const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        company: user.company,
        accessCode: user.accessCode,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const createUser = async (req, res) => {
  const { email, password, company, accessCode, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      company: company || "",
      accessCode: accessCode || "",
      role: role || "",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        email: newUser.email,
        company: newUser.company,
        accessCode: newUser.accessCode,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, company, accessCode, role } = req.body;

  if (!email && !password && !company && !accessCode && !role) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (company) user.company = company;
    if (accessCode) user.accessCode = accessCode;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        email: user.email,
        company: user.company,
        accessCode: user.accessCode,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        company: user.company,
        accessCode: user.accessCode,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
};
