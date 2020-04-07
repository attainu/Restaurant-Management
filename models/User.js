const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
      trim: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: function() {
        return !this.isThirdPartyUser;
      },
      trim: true
    },
    isThirdPartyUser: {
      type: Boolean,
      required: true
    },
    accessToken: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);
userSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Incorrect hai Credentials");
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new Error("Incorrect Credentials");
    return user;
  } catch (err) {
    err.name = "AuthError";
    throw err;
  }
};

userSchema.methods.generateToken = async function() {
  const user = this;
  const accessToken = sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h"
  });
  user.accessToken = accessToken;
  await user.save();
  return accessToken;
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.accessToken;
  delete user.__v;
  return user;
};

//avoiding rehashing the password twice.
userSchema.pre("save", async function(next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
