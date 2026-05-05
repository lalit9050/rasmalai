import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addItem, deleteItem, editItems, getItemById } from "../controllers/item.controllers.js"
import { upload } from "../middlewares/multer.js"

const itemRouter = express.Router()

itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItems)
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById)
itemRouter.get("/delete/:itemId",isAuth,deleteItem)




export default itemRouter