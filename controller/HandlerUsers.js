import db from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { responseJson } from "../global-function/ResponseJson.js";

import dotenv from "dotenv";
dotenv.config()

const Users = db.tbl_users;
const Role = db.tbl_role;

export const handleGetRoot = async (req, res) => {
  return responseJson(res, 200, true, "Stand PPI is OK")
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const user = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return responseJson(res, 401, true, "User Not Found")
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const { userId, name, roleId } = user;
        const accessToken = jwt.sign(
          { userId: userId, name, roleId },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, true, "Error message" + error.message)
  }
};

export const whoAmI = async (req, res) => {
  try {
    const currentUser = req.user;
    return responseJson(res, 200, true, "This data Users Login Now", currentUser)
  } catch (error) {
    console.log(error);
    return responseJson(res, 500, true, "Data Error: " + error.message)
  }
};

export const Login = async (req, res) => {

  try {

    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return responseJson(res, 404, true, "Email not found")
    }

    const match = await bcryptjs.compare(req.body.password, user.password);

    if (!match) {
      return responseJson(res, 404, true, "Incorrect Password")
    }

    const { id, name, id_role, no_stand, email } = user;

    const accessToken = jwt.sign(
      { id, name, id_role, no_stand, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id, name, id_role, no_stand, email},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refreshToken: refreshToken, accessToken: accessToken },
      { where: { id } } // Use id directly without indexing
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Lax",
    });
  
    return responseJson(res, 200, true, "Login Successfully", accessToken)
  } catch (error) {
    console.error("System failure:", error);
    return responseJson(res, 500, true, "System Failure")
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return responseJson(res, 200, true, "User has been logged out")
    }

    const user = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return responseJson(res, 404, true, "User Not Found")
    }

    const userId = user.id;

    await Users.update(
      { refreshtoken: null },
      {
        where: {
          id: userId,
        },
      }
    );

    res.clearCookie("refreshToken");

    return responseJson(res, 200, true, "You have been logout")
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, true, "Internal Server Error")
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const checkData = await Users.findOne({ where: { id } });

    if (!checkData) {
      return responseJson(
        res,
        404,
        false,
        "Users Account doesn't exist or has been deleted!"
      );
    }

    await Users.destroy({ where: { id } });

    return responseJson(
      res,
      200,
      true,
      "Delete Data Users Successfully",
      checkData
    );
  } catch (error) {
    return responseJson(res, 500, false, `Error: ${error.message}`);
  }
};

export const RegisterUsers = async (req, res) => {
  const { name, roleId, noStand, email, password } =
    req.body;

  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);
  try {
    const user = await Users.create({
      name,
      id_role : roleId,
      no_stand : noStand,
      password_real : password,
      password : hashPassword,
      email
    });
    return responseJson(res, 200, true, "Register Data Users Success", user)
  } catch (error) {
    console.log(error);
    return responseJson(res, 500, false, "Error registering " + error.message)
  }
};

export const getDataUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    return responseJson(res, 200, true, "This Data All Users", users);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error fetching data: ${error.message}`);
  }
};

// getDataUsersId controller
export const getDataUsersId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return responseJson(res, 404, false, "Data Doesn't Exist");
    }

    return responseJson(res, 200, true, "Data you searched found", user);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error searching for user: ${error.message}`);
  }
};

// updateDataUsers controller
export const updateDataUsers = async (req, res) => {
  const { id } = req.params;
  const { name, roleId, noStand, email, password } = req.body;

  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);

  try {
    const data_before = await Users.findOne({ where: { id } });

    if (!data_before) {
      return responseJson(
        res,
        404,
        false,
        "Users doesn't exist or has been deleted!"
      );
    }

    await Users.update(
      {
        name,
        id_role: roleId,
        no_stand: noStand,
        real_password: password,
        password: hashPassword,
        email
      },
      { where: { id } }
    );

    const data_update = await Users.findOne({ where: { id } });

    return responseJson(
      res,
      200,
      true,
      "Users Successfully Updated",
      { data_before, data_update }
    );
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error updating user: ${error.message}`);
  }
};