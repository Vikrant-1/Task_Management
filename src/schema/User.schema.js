import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 30,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async (password) => {
  const isPassword = await bcrypt.compare(password, this.password);
  return isPassword ?? false;
};

const User = mongoose.model("User", UserSchema);

export { User };
