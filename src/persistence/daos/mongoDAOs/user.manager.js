import { userModel } from "../../mongoDB/models/users.model.js";

export default class UserManager {
  async getUsers() {
    const users = await userModel.find();
    return users;
  }

  async getUserByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async addUser(propsNewUser) {
    const user = await userModel.create(propsNewUser);
    return user;
  }

  async changePassword(propsToChangePassword) {
    const { email, hashedNewPassword } = propsToChangePassword;
    const userModified = await userModel.findOneAndUpdate(
      { email },
      { password: hashedNewPassword },
      { new: true }
    );
    return userModified;
  }

  async changeRole(id) {
    const user = await userModel.findById(id);
    const role = user.rol === "user" ? "premiun" : "user";
    const userModified = await userModel.findByIdAndUpdate(
      id,
      { rol: role },
      { new: true }
    );
    return userModified;
  }
}
