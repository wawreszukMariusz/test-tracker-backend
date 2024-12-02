const mongoose = require("mongoose");

const AccessCodeSchema = mongoose.Schema(
  {
    accessCode: {
      type: String,
      required: [true, "Access Code is required"],
    },
    password: {
      type: String,
      required: [false, "Password is required"],
    },
    userPermissions: {
      type: [
        {
          userId: {
            type: String,
            required: [true, "User ID is required"],
          },
          userName: {
            type: String,
            required: [true, "User Name is required"],
          },
          role: {
            type: String,
            required: [true, "Role is required"],
          },
        },
      ],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const AccessCode = mongoose.model("AccessCode", AccessCodeSchema);
module.exports = AccessCode;
