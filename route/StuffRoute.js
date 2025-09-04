import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { addNewPhotosToStuff, deleteStuff, getDataStuff, getDataStuffByUser, getDataStuffId, registerNewStuff, UpdateStuff } from "../controller/HandlerStuff.js";
const StuffRoute = express.Router(); // Gunakan Router()

const prefix = "/stuff";

StuffRoute.get(prefix, verifyToken, getDataStuffByUser);
StuffRoute.get(prefix + "/all", getDataStuff);
StuffRoute.post(prefix + "/create", verifyToken, registerNewStuff);
StuffRoute.get(prefix + "/byid/:id", getDataStuffId);
StuffRoute.delete(prefix + "/delete/:id", verifyToken, deleteStuff);
StuffRoute.put(prefix + "/update/:id", verifyToken, UpdateStuff);
StuffRoute.post(prefix + "/add/img/:id", verifyToken, addNewPhotosToStuff);

export default StuffRoute; // Ekspor router
