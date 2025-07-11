import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose"
import { Data } from "../models/number.model.js";

const getFilterData = asyncHandler(async(req , res) => {
    const { page = 1, limit = 100,number, mod350, mod8000, mod20002 } = req.query;
    const query = {};
    if (number) query.number = { $in: number.split(',').map(Number) };
    if (mod350) query.mod350 = { $in: mod350.split(',').map(Number) };
    if (mod8000) query.mod8000 = { $in: mod8000.split(',').map(Number) };
    if (mod20002) query.mod20002 = { $in: mod20002.split(',').map(Number) };
    console.log("Filter Data Query:", JSON.stringify(query, null, 2));
    try {
        const totalDocuments = await Data.countDocuments();
        const data = await Data.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
            const totalRows = await Data.countDocuments(query)
            console.log("Total documents in collection:", totalDocuments);
            console.log("Data found:", data.length, "Total rows(filtered):", totalRows); // Debug
            
        return res 
            .status(200)
            .json(new ApiResponse(200, { data, totalRows, page: Number(page), limit: Number(limit) }, "Data filtered successfully"));
    } catch (error) {
        console.log("Error occured while filtering", error)
        throw new ApiError(500, "Something went wrong while Filtering the Data", )
    }
})

const filterOptions = asyncHandler(async(req, res) => {
    const { column,number, mod350, mod8000, mod20002 } = req.query;
    if(!column || !['number','mod350','mod8000','mod20002'].includes(column)) {
        throw new ApiError(400, "Invalid or missing column parameter", )
    }
    const query = {};
    if (number) query.number = { $in: number.split(',').map(Number) };
    if (mod350) query.mod350 = { $in: mod350.split(',').map(Number) };
    if (mod8000) query.mod8000 = { $in: mod8000.split(',').map(Number) };
    if (mod20002) query.mod20002 = { $in: mod20002.split(',').map(Number) };
    
    try {
        const data = await Data.find(query).distinct(column);
        const options = data.map((value) => ({ value, label: value.toString() }));
        

        
         
        return res 
            .status(200)
            .json(new ApiResponse(200,options,"Filter options retrieved successfully"))
    } catch (error) {
        console.log("Error occurred while fetching option ", error)
        throw new ApiError(500, "Something went wrong while Filtering the Options", )
    }
})


export{
    getFilterData,
    filterOptions
}
