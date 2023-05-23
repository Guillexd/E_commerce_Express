import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils/utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation about Product and Cart",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], // files containing annotations as above
};

export const swaggerSetup = swaggerJSDoc(swaggerOptions);
