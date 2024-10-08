import { User } from "../schema/User.schema.js";
import { generateJwtToken } from "../utils/jwtUtils.js";
import { handleError } from "../utils/responseHandler.js";

const userRegisterService = async ({
  firstname,
  lastname,
  username,
  password,
}) => {
  const dbUser = await User.findOne({ username });
  if (dbUser) throw new Error(`${username} is already exist.`);

  const newUser = new User({
    username,
    firstname,
    lastname,
    password,
  });
  await newUser.save();

  const token = generateJwtToken({ username, id: newUser._id.toString() });

  if (!token) {
    throw new Error("Failed to generate token");
  }

  return {
    username,
    firstname,
    lastname,
    id: newUser._id,
    token,
  };
};

const userLoginService = async ({ username, password }) => {
  try {
    // check user
    const user = await User.findOne({ username });
    if (!user) throw new Error(`${username} does not exist.`);

    const isPassword = await user.comparePassword(password);
    if (!isPassword) throw new Error("Wrong Password");

    const token = generateJwtToken({
      username: user.username,
      id: user._id,
    });

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      token: token,
      id: user._id,
    };
  } catch (error) {
    handleError(res, 401, error?.message ?? "Failed to Login");
  }
};

const getUserService = async ({ userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User did not Exist");
  return user;
};

const updateUserService = async ({ firstname, lastname, userId }) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { firstname, lastname },
    { new: true }
  );
  if (!user) throw new Error("User did not found");
  return user;
};

const updatePasswordService = async ({ userId, password, newPassword }) => {
  if (password !== newPassword) throw new Error("Password not match");
  const user = await User.findById(userId);
  if (!user) throw new Error("User did not exist");

  const isPassword = await user.comparePassword(password);
  if (!isPassword) throw new Error("Password is Wrong");

  const updatedUser = await User.updateOne({ _id: userId }, { password });

  return updatedUser;
};

const deleteUserService = async ({ userId }) => {
  await User.findByIdAndDelete(userId);
};

export {
  userRegisterService,
  userLoginService,
  getUserService,
  updateUserService,
  updatePasswordService,
  deleteUserService,
};
