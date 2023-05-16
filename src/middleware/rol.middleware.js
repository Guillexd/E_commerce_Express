import CustomError from "../utils/errors.js";
import {
  ErrorName,
  ErrorMessage,
  ErrorCause,
} from "../utils/error.dictionary.js";

export const roleMiddleware = async (req, res, next) => {
  try {
    if (!req.user.rol) {
      CustomError.createCustomError({
        name: ErrorName.ROLE_ERROR,
        message: ErrorMessage.ROLE_ERROR,
        cause: ErrorCause.role_req,
      });
    }
    switch (req.user.rol) {
      case "admin":
        req.isAdmin = true;
        next();
        break;

      case "premiun":
        req.isPremiun = true;
        next();
        break;

      case "user":
        next();
        break;

      default:
        next();
        break;
    }
  } catch (error) {
    next(error);
  }
};
