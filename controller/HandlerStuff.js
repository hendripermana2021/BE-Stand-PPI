import db from "../models/index.js";
import { responseJson } from "../global-function/ResponseJson.js";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"
dotenv.config()

const Stuff = db.tbl_stuff
const Category = db.tbl_category
const Users = db.tbl_users
const StuffImage = db.tbl_stuff_img

// Mendapatkan __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDataStuff = async (req, res) => {
  try {
    const stuff = await Stuff.findAll({
      include: [
        {
          model: Users,
          as: "owner",
        },
        {
          model: Category,
          as : "category"
        },
        {
          model: StuffImage,
          as : "listImage"
        }
      ],
    });

    return responseJson(res, 200, true, "Successfully get all stuff", stuff);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error fetching data: ${error.message}`);
  }
};

export const getDataStuffByUser = async (req, res) => {
  try {
    const stuff = await Stuff.findAll({
      include: [
        {
          model: Users,
          as: "owner",
        },
        {
          model: Category,
          as : "category"
        },
        {
          model: StuffImage,
          as : "listImage"
        }
      ],
      where : {
        id_user : req.user.userId
      }
    });

    return responseJson(res, 200, true, "Successfully get all stuff", stuff);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error fetching data: ${error.message}`);
  }
};

export const getDataStuffId = async (req, res) => {
  const { id } = req.params;
  try {
    const stuff = await Stuff.findOne({ 
      where: { id },
      include: [
        {
          model: Users,
          as: "owner",
        },
        {
          model: Category,
          as : "category"
        },
        {
          model: StuffImage,
          as : "listImage"
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

export const deleteStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const checkData = await Stuff.findOne({ 
      where: { id }
    });

    if (!checkData) {
      return responseJson(
        res,
        404,
        false,
        "Stuff doesn't exist or has been deleted!"
      );
    }

    await Stuff.destroy({ where: { id } });

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

export const registerNewStuff = async (req, res) => {
  try {
    const { idCategory, name, price, status, qty, ingridient, description } = req.body;

    // buat data stuff
    const stuff = await Stuff.create({
      name,
      id_category: idCategory,
      price,
      status,
      qty,
      ingridient,
      description,
    });

    // kalau ada file yang diupload
    if (req.files && req.files.length > 0) {
      const imageList = req.files.map((file) => ({
        stuff_id: stuff.id,
        img_url: `/public/images/${file.filename}`, // path simpan di DB
      }));

      await StuffImage.bulkCreate(imageList);
    }

    return responseJson(res, 200, true, "Register Data Stuff Success", stuff);
  } catch (error) {
    console.log(error);
    return responseJson(res, 500, false, "Error registering " + error.message);
  }
};

export const UpdateStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { idCategory, name, price, status, qty, ingridient, description, listImg } = req.body;
    const data_before = await Stuff.findOne({ where: { id } });

    if (!data_before) {
      return responseJson(
        res,
        404,
        false,
        "Stuff doesn't exist or has been deleted!"
      );
    }

    await Stuff.update(
      {
        name,
        id_category : idCategory,
        price,
        status,
        qty,
        ingridient,
        description
      },
      { where: { id } }
    );

    for (let i = 0; i < listImg.length; i++) {
      await StuffImage.update(
        {
          img_url : listImg[i].url
        },
        {
          where: { id: listImg[i].id },
        }
      );
    }

    const data_update = await Stuff.findOne({ where: { id } });

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

export const addNewPhotosToStuff = async (req, res) => {
  try {
    const { id } = req.params;

    // kalau ada file yang diupload
    if (req.files && req.files.length > 0) {
      const imageList = req.files.map((file) => ({
        stuff_id: id,
        img_url: `/public/images/${file.filename}`, // path simpan di DB
      }));

      await StuffImage.bulkCreate(imageList);
    }

    return responseJson(
      res,
      200,
      true,
      "Photo Successfully Added"
    );
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error add image: ${error.message}`);
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params; // id stuff_image
    const { img_url } = req.body; // "/public/images/xxxx.jpeg"

    if (!img_url) {
      return responseJson(res, 400, false, "No image URL provided");
    }

    // Buat path file dari URL
    // Misal img_url = "/public/images/xxx.jpeg"
    const relativePath = img_url.replace(/^\/public/, ''); // "/images/xxx.jpeg"
    const filePath = path.join(__dirname, '../public', relativePath); // sesuaikan folder public

    // Hapus file jika ada
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Hapus record dari database
    await StuffImage.destroy({
      where: {
        id: id
      },
    });

    return responseJson(res, 200, true, "Image successfully deleted");
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, false, `Error deleting image: ${error.message}`);
  }
};