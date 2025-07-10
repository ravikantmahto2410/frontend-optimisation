import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose"
import { Data } from "../models/number.model.js";

const getFilterData = asyncHandler(async(req , res) => {
    const { page = 1, limit = 100, mod350, mod8000, mod20002 } = req.query;
    const query = {};
    if (mod350) query.mod350 = { $in: mod350.split(',').map(Number) };
    if (mod8000) query.mod8000 = { $in: mod8000.split(',').map(Number) };
    if (mod20002) query.mod20002 = { $in: mod20002.split(',').map(Number) };

    try {
        const data = await Data.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        return res 
            .status(201)
            .json(new ApiResponse(200),"Data Filtered Successfully")
    } catch (error) {
        console.log("Error occured while filtering", error)
        throw new ApiError(500, "Something went wrong while Filtering the Data", )
    }
})



export{
    getFilterData
}
