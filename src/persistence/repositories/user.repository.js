import { userResponse, usersResponse } from "../dtos/user.dtos.js";
import {
  comparePasswords,
  generateToken,
  hashPassword,
} from "../../utils/utils.js";
import CustomError from "../../utils/errors.js";
import {
  ErrorName,
  ErrorMessage,
  ErrorCause,
} from "../../utils/error.dictionary.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers(){
    const usersDao = await this.dao.getUsers();
    const dataUsers = usersResponse(usersDao)
    return dataUsers;
  }

  async getUserByEmail(email, password) {
    const userDao = await this.dao.getUserByEmail(email);
    const isPassword = await comparePasswords(password, userDao.password);
    if (!isPassword) throw Error;
    //we generate a token, httpOnly becuase of security in frontend and maxAge(1h) due to have same expiration time with generated token from util.js
    const user = userResponse(userDao);
    const token = generateToken(user);
    return token;
  }

  async getUserByPassport(email) {
    const userDao = await this.dao.getUserByEmail(email);
    if (!userDao) throw Error;
    const user = userResponse(userDao);
    const token = generateToken(user);
    return token;
  }

  async addUser(propsNewUser) {
    const hashedPassword = await hashPassword(propsNewUser.password);
    const newUser = await this.dao.addUser({
      ...propsNewUser,
      password: hashedPassword,
    });
    const user = userResponse(newUser);
    return user;
  }

  async changePassword(email, oldPassword, newPassword) {
    const user = await this.dao.getUserByEmail(email);
    const verifyPassword = await comparePasswords(newPassword, user.password);
    if (verifyPassword) {
      CustomError.createCustomError({
        name: ErrorName.USER_ERROR_CHANGE_PASSWORD_POST,
        message: ErrorMessage.USER_ERROR_CHANGE_EQUAL_PASSWORD_POST,
        cause: ErrorCause.password_change_password_post,
      });
    }
    let password = await comparePasswords(oldPassword, user.password);
    if (!password) {
      CustomError.createCustomError({
        name: ErrorName.USER_ERROR_CHANGE_PASSWORD_POST,
        message: ErrorMessage.USER_ERROR_CHANGE_DIFFERENT_PASSWORD_POST,
        cause: ErrorCause.password_change_password_post,
      });
    }
    password = await hashPassword(newPassword);
    const newUser = await this.dao.changePassword({
      email,
      hashedNewPassword: password,
    });
    const userChanged = userResponse(newUser);
    return userChanged;
  }

  async getUserPremiunById(id) {
    const user = await this.dao.getUserPremiunById(id);
    const userChanged = userResponse(user);
    return userChanged;
  }
}
