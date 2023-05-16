export const userResponse = (dataUser) => {
  const user = {...dataUser?._doc};
  delete user.password;
  delete user.__v;
  return user;
}