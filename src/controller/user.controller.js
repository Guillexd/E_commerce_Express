import { getUsers, getUserByEmail, addUser, changePassword, getUserPremiunById } from "../services/user.services.js";
import { verifyToken, generateToken } from "../utils/utils.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (err) {
    return res.redirect("/api/products");
  }
}

export async function getOneUserByEmail(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email, password);
    return res.cookie('tokenJwt', user, {httpOnly: true, maxAge: 1000 * 60 * 60}).redirect('/api/products');
  } catch (err) {
    return res.redirect("/view/error-login");
  }
}

export async function putCookieAndRedirect(req, res) {
  try {
    return res.cookie('tokenJwt', req.user, {httpOnly: true, maxAge: 1000 * 60 * 60}).redirect('/api/products');
  } catch (err) {
    return res.redirect("/view/error-login");
  }
}

export async function logoutUser(req, res) {
  try {
    return res.clearCookie("tokenJwt").redirect("/view/login");
  } catch (err) {
    return res.redirect("/view/error-login");
  }
}

export async function addOneUser(req, res) {
  const { first_name, last_name, age, email, password } = req.body;
  const propsNewUser = { first_name, last_name, age, email, password };
  try {
    const newUser = await addUser(propsNewUser);
    return res.redirect('/view/login');
  } catch (err) {
    return res.redirect("/view/error-register");
  }
}

export async function changeOnePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await changePassword(req.user, oldPassword, newPassword);
    return res.json({message: "Success"});
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
      cause: error.cause,
    });
  }
}

export async function changeRole(req, res) {
  const { uid } = req.params;
  try {
    const isPremiun = await getUserPremiunById(uid);
    const {user} = verifyToken(req.cookies.tokenJwt)
    let token;
    if(user && isPremiun.rol === "premiun") {
      user.rol == "premiun" ? user.rol = "user" : user.rol = "premiun";
      token = generateToken(user)
    }
    return res.cookie('tokenJwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60}).redirect("/api/products");
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
      cause: error.cause,
    });
  }
}
