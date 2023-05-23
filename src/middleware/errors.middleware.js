import logger from "../utils/winston.js";

export const errorMiddleware = (error, req, res, next) => {
  logger.error({
    name: error.name,
    message: error.message,
    cause: error.cause,
  });
  res.status(400).json({
    name: error.name,
    message: error.message,
    cause: error.cause,
  });
};
