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
    console.log("Filter Data Query:", JSON.stringify(query, null, 2));
    try {
        const totalDocuments = await Data.countDocuments();
        const data = await Data.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
            const totalRows = await Data.countDocuments(query)
            console.log("Total documents in collection:", totalDocuments);
            console.log("Data found:", data.length, "Total rows:", totalRows); // Debug
            console.log("Sample data:", data.slice(0, 2));
        return res 
            .status(200)
            .json(new ApiResponse(200,{data, totalRows},"Data Filtered Successfully"))
    } catch (error) {
        console.log("Error occured while filtering", error)
        throw new ApiError(500, "Something went wrong while Filtering the Data", )
    }
})

const filterOptions = asyncHandler(async(req, res) => {
    const { column, mod350, mod8000, mod20002 } = req.query;
    if(!column || !['mod350','mod8000','mod20002'].includes(column)) {
        throw new ApiError(400, "Invalid or missing column parameter", )
    }
    const query = {};
    if (mod350) query.mod350 = { $in: mod350.split(',').map(Number) };
    if (mod8000) query.mod8000 = { $in: mod8000.split(',').map(Number) };
    if (mod20002) query.mod20002 = { $in: mod20002.split(',').map(Number) };
    console.log("Filter Options Query:", JSON.stringify(query, null, 2), "Column:", column);
    try {
        const data = await Data.find(query).distinct(column);
        const options = data.map((value) => ({ name: value.toString(), value }));
        console.log("Options found:", options.length, "Sample options:", options.slice(0, 2));
        const response = new ApiResponse(200, options, "Filter Options Retrieved Successfully");
         console.log("Response object:", JSON.stringify(response, null, 2));
        return res 
            .status(200)
            .json(new ApiResponse(200),options,"Data Filtered Successfully")
    } catch (error) {
        console.log("Error occurred while fetching option ", error)
        throw new ApiError(500, "Something went wrong while Filtering the Options", )
    }
})


export{
    getFilterData,
    filterOptions
}
