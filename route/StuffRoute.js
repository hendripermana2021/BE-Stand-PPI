import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { addNewPhotosToStuff, deletePhoto, deleteStuff, getDataStuff, getDataStuffByUser, getDataStuffId, registerNewStuff, UpdateStuff } from "../controller/HandlerStuff.js";
import multer from "multer";
const StuffRoute = express.Router(); // Gunakan Router()

// Tempat penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // folder uploads di project
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const prefix = "/stuff";

StuffRoute.get(prefix, verifyToken, getDataStuffByUser);
StuffRoute.get(prefix + "/all", getDataStuff);
StuffRoute.post(prefix + "/create", upload.array('images', 5), verifyToken, registerNewStuff);
StuffRoute.get(prefix + "/byid/:id", getDataStuffId);
StuffRoute.delete(prefix + "/delete/:id", verifyToken, deleteStuff);
StuffRoute.put(prefix + "/update/:id", verifyToken, UpdateStuff);
StuffRoute.post(prefix + "/add/img/:id", upload.array('images', 5), verifyToken, addNewPhotosToStuff);
StuffRoute.delete(prefix + "/img/delete/:id", verifyToken, deletePhoto);

export default StuffRoute; // Ekspor router
