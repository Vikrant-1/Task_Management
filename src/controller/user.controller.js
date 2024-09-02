import {
  userLoginService,
  userRegisterService,
} from "../services/userService.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import {
  zodUserLoginValidation,
  zodUserRegisterValidation,
} from "../zodSchema/zodUserValidation.js";

const registerUser = async (req, res) => {
  try {
    // get user details
    const { firstname, lastname, username, password } = req.params ?? {};
    // parse it with zod
    const zodCheck = zodUserRegisterValidation.safeParse({
      firstname,
      lastname,
      username,
      password,
    });
    if (zodCheck.error) return handleError(res, 401, "User validation failed");

    const newUser = await userRegisterService(
      firstname,
      lastname,
      username,
      password
    );
    handleSuccess(res, 201, "User resgistered Successfully", newUser);
  } catch (error) {
    handleError(res, 409, error?.message ?? "Failed to create new account.");
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.params ?? {};
    const zodCheck = zodUserLoginValidation.safeParse({
      username,
      password,
    });
    if (zodCheck.error)
      return handleError(res, 401, "Please enter valid username or password.");

    const user = await userLoginService({ username, password });

    handleSuccess(res, 200, "Logged in Sucessfully!!", user);
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

export { registerUser, loginUser, getUser };
