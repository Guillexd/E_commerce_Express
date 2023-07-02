import { userDao } from "../persistence/daos/factory.js";

export async function getUsers() {
  const users = await userDao.getUsers();
  return users;
}

export async function getUserByEmail(email, password) {
  const user = await userDao.getUserByEmail(email, password);
  return user;
}

export async function getUserByPassport(email) {
  const user = await userDao.getUserByPassport(email);
  return user;
}

export async function addUser(propsNewUser) {
  const newUser = await userDao.addUser(propsNewUser);
  return newUser;
}

export async function changePassword(email, oldPassword, newPassword) {
  const newUser = await userDao.changePassword(email, oldPassword, newPassword);
  return newUser;
}

export async function getUserPremiunById(id) {
  const newUser = await userDao.getUserPremiunById(id);
  return newUser;
}
