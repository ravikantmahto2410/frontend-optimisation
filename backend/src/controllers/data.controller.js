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

    try {
        const query = {};
        if (column !== 'number' && number) query.number = { $in: number.split(',').map(Number) };
        if (column !== 'mod350' && mod350 ) query.mod350 = { $in: mod350.split(',').map(Number) };
        if (column !== 'mod8000' && mod8000) query.mod8000 = { $in: mod8000.split(',').map(Number) };
        if (column !== 'mod20002' && mod20002) query.mod20002 = { $in: mod20002.split(',').map(Number) };

        console.log(`Getting options for column: ${column}, Query:`, JSON.stringify(query, null, 2));

        const distinctValues = await Data.find(query).distinct(column);

        const options = distinctValues.map((value) => ({
            value: value,
            label: value.toString()
        }));
        
        console.log(`Found ${options.length} options for column ${column}`);
        
        return res
            .status(200)
            .json(
            new ApiResponse(200, options, "Filter options retrieved successfully")
        );
    } catch (error) {
        console.log("Error occurred while fetching option ", error)
        throw new ApiError(500, "Something went wrong while Filtering the Options", )
    }
    
})


const getAllFilterOptions = asyncHandler(async (req, res) => {
    const { number, mod350, mod8000, mod20002 } = req.query;
    
    try {
        // Build base queries for each column
        const queries = {
            number: {},
            mod350: {},
            mod8000: {},
            mod20002: {}
        };
        
        // For each column, exclude its own filter but include others
        if (mod350) queries.number.mod350 = { $in: mod350.split(',').map(Number) };
        if (mod8000) queries.number.mod8000 = { $in: mod8000.split(',').map(Number) };
        if (mod20002) queries.number.mod20002 = { $in: mod20002.split(',').map(Number) };
        
        if (number) queries.mod350.number = { $in: number.split(',').map(Number) };
        if (mod8000) queries.mod350.mod8000 = { $in: mod8000.split(',').map(Number) };
        if (mod20002) queries.mod350.mod20002 = { $in: mod20002.split(',').map(Number) };
        
        if (number) queries.mod8000.number = { $in: number.split(',').map(Number) };
        if (mod350) queries.mod8000.mod350 = { $in: mod350.split(',').map(Number) };
        if (mod20002) queries.mod8000.mod20002 = { $in: mod20002.split(',').map(Number) };
        
        if (number) queries.mod20002.number = { $in: number.split(',').map(Number) };
        if (mod350) queries.mod20002.mod350 = { $in: mod350.split(',').map(Number) };
        if (mod8000) queries.mod20002.mod8000 = { $in: mod8000.split(',').map(Number) };
        
        // Execute all queries in parallel for better performance
        const [numberOptions, mod350Options, mod8000Options, mod20002Options] = await Promise.all([
            Data.find(queries.number).distinct('number'),
            Data.find(queries.mod350).distinct('mod350'),
            Data.find(queries.mod8000).distinct('mod8000'),
            Data.find(queries.mod20002).distinct('mod20002')
        ]);
        
        // Format options for frontend
        const formatOptions = (values) => {
            return values.sort((a, b) => a - b).map(value => ({
                value: value,
                label: value.toString()
            }));
        };
        
        const allOptions = {
            number: formatOptions(numberOptions),
            mod350: formatOptions(mod350Options),
            mod8000: formatOptions(mod8000Options),
            mod20002: formatOptions(mod20002Options)
        };
        
        console.log("All filter options retrieved:", {
            number: allOptions.number.length,
            mod350: allOptions.mod350.length,
            mod8000: allOptions.mod8000.length,
            mod20002: allOptions.mod20002.length
        });
        
        return res.status(200).json(
            new ApiResponse(200, allOptions, "All filter options retrieved successfully")
        );
    } catch (error) {
        console.log("Error occurred while fetching all options", error);
        throw new ApiError(500, "Something went wrong while fetching all filter options");
    }
});


const getFilterCounts = asyncHandler(async (req, res) => {
    const { column, number, mod350, mod8000, mod20002 } = req.query;
    
    if (!column || !['number', 'mod350', 'mod8000', 'mod20002'].includes(column)) {
        throw new ApiError(400, "Invalid or missing column parameter");
    }
    
    try {
        // Build query excluding the current column
        const query = {};
        if (column !== 'number' && number) {
            query.number = { $in: number.split(',').map(Number) };
        }
        if (column !== 'mod350' && mod350) {
            query.mod350 = { $in: mod350.split(',').map(Number) };
        }
        if (column !== 'mod8000' && mod8000) {
            query.mod8000 = { $in: mod8000.split(',').map(Number) };
        }
        if (column !== 'mod20002' && mod20002) {
            query.mod20002 = { $in: mod20002.split(',').map(Number) };
        }
        
        // Use aggregation to get counts for each distinct value
        const counts = await Data.aggregate([
            { $match: query },
            { $group: { _id: `$${column}`, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        
        const options = counts.map(item => ({
            value: item._id,
            label: item._id.toString(),
            count: item.count
        }));
        
        return res.status(200).json(
            new ApiResponse(200, options, "Filter counts retrieved successfully")
        );
    } catch (error) {
        console.log("Error occurred while fetching filter counts", error);
        throw new ApiError(500, "Something went wrong while fetching filter counts");
    }
});


export{
    getFilterData,
    getAllFilterOptions,
    getFilterCounts,
    filterOptions
}