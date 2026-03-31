import { userModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email: email });

  if (userExist) {
    return res.status(200).json({ message: "User Already Exists" });
  }

  const user = await userModel.create({
    email,
    password,
  });


  const userObj = user.toObject();
  delete userObj.password;


  return res
    .status(201)
    .json({ user: userObj, message: "User Created Successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel
    .findOne({ email: email })
    .select("+password");

  if (!userExist) {
    return res.status(404).json({ message: "Incorrect Email or Password" });
  }

  const isCorrectPassword = await userExist.comparePassword(password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: "Incorrect Email or Password" });
  }

  const userObj = userExist.toObject();
  delete userObj.password;

  const token = await userExist.generateToken(userExist._id);


  return res
    .status(200)
    .json({ user: userObj, message: "User Fetched Successfully", token });
});

const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userExist = await userModel.findById(userId);

  if (!userExist) {
    return res.status(404).json({ message: "User Not found" });
  }

  return res
    .status(200)
    .json({ user: userExist, message: "User Fetched Successfully" });
});

export { register, login, getMe };
