import db from "../models/index.js";
import { responseJson } from "../global-function/ResponseJson.js";

import dotenv from "dotenv";
dotenv.config()

const Entry = db.tbl_entry
const Bucket = db.tbl_bucket

export const getDataEntry = async (req, res) => {
  try {
    const entry = await Entry.findAll({
      include: [
        {
          model: Bucket,
          as: "entryBucket",
        }
      ],
    });

    return responseJson(res, 200, true, "Successfully get all entry", entry);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error fetching data: ${error.message}`);
  }
};

export const getDataEntryByUserId = async (req, res) => {
  try {
    const entry = await Entry.findAll({
      include: [
        {
          model: Bucket,
          as: "entryBucket",
        }
      ],
      where : {
        id_user : req.user.userId
      }
    });

    return responseJson(res, 200, true, "Successfully get all entry", entry);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error fetching data: ${error.message}`);
  }
};

export const getDataEntryId = async (req, res) => {
  const { id } = req.params;
  try {
    const stuff = await Entry.findOne({ 
      where: { id },
      include: [
        {
          model: Bucket,
          as: "entryBucket",
        }
      ],
    });

    if (!stuff) {
      return responseJson(res, 404, false, "Data Doesn't Exist");
    }

    return responseJson(res, 200, true, "Stuff you searched found", stuff);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error searching for user: ${error.message}`);
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const checkData = await Entry.findOne({ 
      where: { id }
    });

    if (!checkData) {
      return responseJson(
        res,
        404,
        true,
        "Entry doesn't exist or has been deleted!"
      );
    }

    await Entry.destroy({ where: { id } });

    await Bucket.destroy({
      where : {
        id_entry: id
      }
    })

    return responseJson(
      res,
      200,
      true,
      "Delete Data Entry Successfully",
      checkData
    );
  } catch (error) {
    return responseJson(res, 500, false, `Error: ${error.message}`);
  }
};

export const addNewEntry = async (req, res) => {
  try {
     const { payBy, listStuff } =
    req.body;

    if(!listStuff.length){
      return responseJson(res, 404, true, "Please added list stuff you need")
    }

    const entry = await Entry.create({
      pay_by : payBy,
      status : true,
      id_user : req.user.userId,
      created_by : req.user.name
    });

    const listStuffEntry = listStuff.map((val) => ({
      name_stuff : val.nameStuff,
      id_entry : entry.id,
      price : val.price,
      qty : val.qty
    }))

    await Bucket.bulkCreate(listStuffEntry);
    
    return responseJson(res, 200, true, "Register Data Entry Success", entry)
  } catch (error) {
    console.log(error);
    return responseJson(res, 500, false, "Error registering " + error.message)
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { payBy, listStuff } = req.body;
    const data_before = await Entry.findOne({ where: { id } });

    if (!data_before) {
      return responseJson(
        res,
        404,
        false,
        "Entry doesn't exist or has been deleted!"
      );
    }

    await Entry.update(
      {
        pay_by : payBy
      },
      { where: { id } }
    );

    for (let i = 0; i < listStuff.length; i++) {
      await Bucket.update(
        {
          name_stuff : listStuff[i].nameStuff,
          qty : listStuff[i].qty
        },
        {
          where: { id: listStuff[i].id },
        }
      );
    }

    const data_update = await Entry.findOne({ where: { id } });

    return responseJson(
      res,
      200,
      true,
      "Entry Successfully Updated",
      { data_before, data_update }
    );
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error updating user: ${error.message}`);
  }
};