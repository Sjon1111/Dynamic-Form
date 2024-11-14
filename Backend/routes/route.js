import express from "express";
import { insertData, getData, updateData, deleteForm } from "../controller/formControll.js";

const router = express.Router()
router.post("/insert", insertData);
router.get("/get", getData);
router.put("/update/:id", updateData);
router.delete("/delete/:id", deleteForm)


export default router;