import { Router } from "express";
import { getFilterData, filterOptions,getAllFilterOptions,getFilterCounts, } from "../controllers/data.controller.js";


const router = Router()

router.route('/filterdata').get(getFilterData);
router.route('/filter-options').get(filterOptions)
router.route('/all-filter-options').get(getAllFilterOptions);
router.route('/filter-counts').get(getFilterCounts)



export default router