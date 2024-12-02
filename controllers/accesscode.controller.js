const AccessCode = require("../models/accesscode.model");

// Pobierz wszystkie AccessCode
const getAllAccessCodes = async (req, res) => {
  try {
    const accessCodes = await AccessCode.find();
    res.status(200).json(accessCodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching access codes", error });
  }
};

// Pobierz AccessCode dla podanego accessCode
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

// Utwórz nowy AccessCode lub zwróć istniejący
const createAccessCode = async (req, res) => {
  const { accessCode, password, userPermissions } = req.body;

  try {
    const existingCode = await AccessCode.findOne({ accessCode });
    if (existingCode) {
      return res.status(200).json(existingCode); // Zwróć istniejący AccessCode
    }

    const newAccessCode = new AccessCode({
      accessCode,
      password,
      userPermissions,
    });
    const savedCode = await newAccessCode.save();
    res.status(201).json(savedCode);
  } catch (error) {
    res.status(500).json({ message: "Error creating access code", error });
  }
};

// Zaktualizuj AccessCode
const updateAccessCode = async (req, res) => {
  const { accessCode } = req.params;

  try {
    const updatedCode = await AccessCode.findOneAndUpdate(
      { accessCode },
      { $set: req.body }, // Aktualizuje dowolne pola przekazane w ciele żądania
      { new: true, runValidators: true } // Zwróć zaktualizowany dokument i waliduj dane
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

  // Sprawdź, czy podano oba pola
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

    // Sprawdź poprawność hasła
    if (code.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Jeśli wszystko się zgadza, zwróć dane AccessCode
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json({ message: "Error verifying access code", error });
  }
};

const createOrValidateAccessCode = async (req, res) => {
  const { accessCode, password, userPermissions } = req.body;

  // Sprawdź, czy wszystkie wymagane pola są podane
  if (!accessCode || !password) {
    return res
      .status(400)
      .json({ message: "AccessCode and password are required" });
  }

  try {
    // Sprawdź, czy AccessCode już istnieje
    const existingCode = await AccessCode.findOne({ accessCode });

    if (existingCode) {
      // Jeśli istnieje, sprawdź hasło
      if (existingCode.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Zwróć istniejący AccessCode, jeśli hasło jest poprawne
      return res.status(200).json(existingCode);
    }

    // Jeśli AccessCode nie istnieje, utwórz nowy
    const newAccessCode = new AccessCode({
      accessCode,
      password,
      userPermissions,
    });

    const savedCode = await newAccessCode.save();

    // Zwróć nowo utworzony AccessCode
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
