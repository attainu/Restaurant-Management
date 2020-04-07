const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    isThirdPartyAdmin: {
      type: Boolean,
      required: false
    },
    accessToken: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

adminSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) throw new Error("Incorrect Credentials");
    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched) throw new Error("Incorrect Credentials");
    return admin;
  } catch (err) {
    err.name = "AuthError";
    throw err;
  }
};

adminSchema.methods.generateToken = async function() {
  const admin = this;
  const accessToken = sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h"
  });
  admin.accessToken = accessToken;
  await admin.save();
  return accessToken;
};

adminSchema.methods.toJSON = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.accessToken;
  delete admin.__v;
  return admin;
};

// I should avoid rehashing the password twice.
adminSchema.pre("save", async function(next) {
  const admin = this;
  try {
    if (admin.isModified("password")) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});


const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
