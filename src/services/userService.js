import { User } from "../schema/User.schema.js";

const userRegisterService = async ({
  firstname,
  lastname,
  username,
  password,
}) => {
  const dbUser = await User.findOne({ username });
  if (dbUser) throw new Error(`${username} is already exist.`);

  const newUser = new User({
    username,
    firstname,
    lastname,
    password,
  });
  await newUser.save();
  return newUser;
};


export {
    userRegisterService,
}