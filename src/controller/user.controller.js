import { userRegisterService } from "../services/userService";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { zodUserRegisterValidation } from "../zodSchema/zodUserValidation";

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

export { registerUser };
