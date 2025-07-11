import { Router } from "express";
import { getFilterData, filterOptions } from "../controllers/data.controller.js";


const router = Router()

router.route('/filterdata').get(getFilterData);
router.route('/filter-options').get(filterOptions)


export default router