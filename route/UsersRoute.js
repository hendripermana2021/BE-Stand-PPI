import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { deleteUsers, getDataUsers, getDataUsersId, handleGetRoot, Login, Logout, refreshToken, RegisterUsers, updateDataUsers, whoAmI } from "../controller/HandlerUsers.js";
const UsersRoute = express.Router(); // Gunakan Router()

const prefix = "/user";

UsersRoute.get("/check", handleGetRoot);
UsersRoute.get(prefix + "/refreshToken", verifyToken, refreshToken);
UsersRoute.get(prefix + "/me", verifyToken, whoAmI);
UsersRoute.post("/login", Login);
UsersRoute.post("/logout", Logout);
UsersRoute.delete(prefix + "/delete/:id", verifyToken, deleteUsers);
UsersRoute.post(prefix + "/create", verifyToken, RegisterUsers);
UsersRoute.get(prefix, getDataUsers);
UsersRoute.get(prefix + "/byid/:id", verifyToken, getDataUsersId)
UsersRoute.put(prefix + "/update/:id", verifyToken, updateDataUsers)

export default UsersRoute; // Ekspor router
