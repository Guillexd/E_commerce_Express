export const userResponse = (dataUser) => {
  const user = {...dataUser?._doc};
  delete user.password;
  delete user.__v;
  return user;
}

export const usersResponse = (dataUser) => {
  console.log("zxd");
  const data = dataUser.map((data) => {
    const user = {...data?._doc};
    delete user.password;
    delete user.last_name;
    delete user.age;
    delete user._id;
    delete user.__v;
    return user
  })
  return data
}