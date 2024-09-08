import {
  deleteUserService,
  getUserService,
  updatePasswordService,
  updateUserService,
  userLoginService,
  userRegisterService,
} from "../services/userService.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import {
  zodPasswordCheck,
  zodUpdateValidation,
  zodUserLoginValidation,
  zodUserRegisterValidation,
} from "../zodSchema/zodUserValidation.js";

const registerUser = async (req, res) => {
  try {
    // get user details
    const { firstname, lastname, username, password } = req.body ?? {};

    const zodCheck = zodUserRegisterValidation.safeParse({
      firstname,
      lastname,
      username,
      password,
    });
    if (zodCheck.error)
      return handleError(
        res,
        401,
        zodCheck.error.message ?? "User validation failed"
      );

    const newUser = await userRegisterService({
      firstname,
      lastname,
      username,
      password,
    });
    return res.status(200).cookie("token", newUser.token).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    handleError(res, 409, error?.message ?? "Failed to create new account.");
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    const zodCheck = zodUserLoginValidation.safeParse({
      username,
      password,
    });
    if (zodCheck.error)
      return handleError(res, 401, "Please enter valid username or password.");

    const user = await userLoginService({ username, password });
    const option = {
      http: true,
      secure: true,
    };
    return res.status(200).cookie("token", user.token, option).json({
      success: true,
      message: "Login Successful",
      data: user,
    });
  } catch (error) {
    handleError(res, 401, error?.message ?? "Failed to Login");
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserService({ userId });
    handleSuccess(res, 200, "Successfully fetched user!!", user);
  } catch (error) {
    handleError(res, 401, error?.message ?? "User did not found");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstname, lastname } = req.params ?? {};
    const zodCheck = zodUpdateValidation.safeParse({ firstname, lastname });
    if (zodCheck.error)
      return handleError(res, 401, "Please Enter valid firstname or lastname");
    const user = await updateUserService({ firstname, lastname, userId });
    handleSuccess(res, 200, "User details updated succesfully!!", user);
  } catch (error) {
    handleError(res, 401, error?.message ?? "Failed to update user details");
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { password, newPassword } = req.params ?? {};
    const zodCheck = zodPasswordCheck.safeParse({ password, newPassword });
    if (zodCheck.error) throw new Error("Invalid Password");

    await updatePasswordService({ userId, password, newPassword });
    handleSuccess(res, 200, "Password Updated successfully!!");
  } catch (error) {
    handleError(res, 401, error?.message ?? "Failed to udpate password");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    await deleteUserService({ userId });
    handleSuccess(res, 200, "User deleted successfully!!");
  } catch (error) {
    handleError(res, 401, error?.message ?? "Failed to delete User");
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
};
