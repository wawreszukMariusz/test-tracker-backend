const AccessCode = require("../models/accesscode.model");
const bcrypt = require("bcrypt");

const getAllAccessCodes = async (req, res) => {
  try {
    const accessCodes = await AccessCode.find();
    res.status(200).json(accessCodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching access codes", error });
  }
};

const getAccessCodeByCode = async (req, res) => {
  const { accessCode } = req.params;
  try {
    const code = await AccessCode.findOne({ accessCode });
    if (!code) {
      return res.status(404).json({ message: "AccessCode not found" });
    }
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json({ message: "Error fetching access code", error });
  }
};

const createAccessCode = async (req, res) => {
  const { accessCode, password, userPermissions } = req.body;

  try {
    const existingCode = await AccessCode.findOne({ accessCode });
    if (existingCode) {
      return res.status(200).json(existingCode);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccessCode = new AccessCode({
      accessCode,
      password: hashedPassword,
      userPermissions,
    });
    const savedCode = await newAccessCode.save();
    res.status(201).json(savedCode);
  } catch (error) {
    res.status(500).json({ message: "Error creating access code", error });
  }
};

const updateAccessCode = async (req, res) => {
  const { accessCode } = req.params;

  try {
    const updatedCode = await AccessCode.findOneAndUpdate(
      { accessCode },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCode) {
      return res.status(404).json({ message: "AccessCode not found" });
    }

    res.status(200).json(updatedCode);
  } catch (error) {
    res.status(500).json({ message: "Error updating access code", error });
  }
};

const getAccessCodeByCodeAndPassword = async (req, res) => {
  const { accessCode, password } = req.body;

  if (!accessCode || !password) {
    return res
      .status(400)
      .json({ message: "AccessCode and password are required" });
  }

  try {
    const code = await AccessCode.findOne({ accessCode });

    if (!code) {
      return res.status(404).json({ message: "AccessCode not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, code.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json(code);
  } catch (error) {
    res.status(500).json({ message: "Error verifying access code", error });
  }
};

const createOrValidateAccessCode = async (req, res) => {
  const { accessCode, password, userPermissions } = req.body;

  if (!accessCode || !password) {
    return res
      .status(400)
      .json({ message: "AccessCode and password are required" });
  }

  try {
    const existingCode = await AccessCode.findOne({ accessCode });

    if (existingCode) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingCode.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(200).json(existingCode);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccessCode = new AccessCode({
      accessCode,
      password: hashedPassword,
      userPermissions,
    });

    const savedCode = await newAccessCode.save();

    res.status(201).json(savedCode);
  } catch (error) {
    res.status(500).json({ message: "Error handling access code", error });
  }
};

module.exports = {
  getAllAccessCodes,
  getAccessCodeByCode,
  createAccessCode,
  updateAccessCode,
  getAccessCodeByCodeAndPassword,
  createOrValidateAccessCode,
};
