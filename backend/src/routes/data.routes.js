import { Router } from "express";
import { getFilterData } from "../controllers/data.controller.js";


const router = Router()

router.route('/filterdata').get(getFilterData);


export default router