import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { addNewEntry, deleteEntry, getDataEntry, getDataEntryByUserId, getDataEntryId, updateEntry } from "../controller/HandlerEntryStuff.js";
const EntryRoute = express.Router(); // Gunakan Router()

const prefix = "/entry";

EntryRoute.get(prefix, verifyToken, getDataEntryByUserId);
EntryRoute.get(prefix + "/all", getDataEntry);
EntryRoute.post(prefix + "/create", verifyToken, addNewEntry);
EntryRoute.get(prefix + "/byid/:id", getDataEntryId);
EntryRoute.delete(prefix + "/delete/:id", verifyToken, deleteEntry);
EntryRoute.put(prefix + "/update/:id", verifyToken, updateEntry);

export default EntryRoute; // Ekspor router
