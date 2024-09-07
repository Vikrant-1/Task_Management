import { User } from "../schema/User.schema";
import { verifyJwtToken } from "../utils/jwtUtils";
import { handleError, handleSuccess } from "../utils/responseHandler";

async function authMiddleware(req, res, next) {
  try {
    const bearerHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!bearerHeader) {
      return handleError(res, 401, "Unauthorized");
    }

    const bearer = bearerHeader.split(" ")[1];

    if (!bearer) {
      return handleError(res, 401, "Unauthorized");
    }

    const decodeToken = verifyJwtToken(bearer);
    const { username, id } = decodeToken;
    const user = await User.findOne({ username });

    if (user.username === username) {
      req.user = user;
      next();
    }
    return handleError(res, 401, "Unauthorized");
  } catch (error) {
    return handleError(res, 401, "Unauthorized");
  }
}

export default authMiddleware;
