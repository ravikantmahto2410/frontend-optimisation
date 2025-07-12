// Simple in-memory cache for filter options
class CacheHelper {
    constructor() {
        this.cache = new Map();
        this.cacheTTL = 5 * 60 * 1000; // 5 minutes
    }

    // Generate cache key from query parameters
    generateCacheKey(prefix, params) {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');
        return `${prefix}:${sortedParams}`;
    }

    // Get cached value
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        // Check if cache is expired
        if (Date.now() - cached.timestamp > this.cacheTTL) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }

    // Set cached value
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Clear all cache
    clear() {
        this.cache.clear();
    }

    // Get cache statistics
    getStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Export singleton instance
export const cache = new CacheHelper();

// Helper function to build MongoDB queries
export const buildQuery = (filters) => {
    const query = {};
    
    if (filters.number) {
        query.number = { $in: filters.number.split(',').map(Number) };
    }
    if (filters.mod350) {
        query.mod350 = { $in: filters.mod350.split(',').map(Number) };
    }
    if (filters.mod8000) {
        query.mod8000 = { $in: filters.mod8000.split(',').map(Number) };
    }
    if (filters.mod20002) {
        query.mod20002 = { $in: filters.mod20002.split(',').map(Number) };
    }
    
    return query;
};

// Helper function to build query excluding specific column
export const buildQueryExcluding = (filters, excludeColumn) => {
    const query = {};
    
    if (excludeColumn !== 'number' && filters.number) {
        query.number = { $in: filters.number.split(',').map(Number) };
    }
    if (excludeColumn !== 'mod350' && filters.mod350) {
        query.mod350 = { $in: filters.mod350.split(',').map(Number) };
    }
    if (excludeColumn !== 'mod8000' && filters.mod8000) {
        query.mod8000 = { $in: filters.mod8000.split(',').map(Number) };
    }
    if (excludeColumn !== 'mod20002' && filters.mod20002) {
        query.mod20002 = { $in: filters.mod20002.split(',').map(Number) };
    }
    
    return query;
};

// Helper function to format filter options
export const formatFilterOptions = (values) => {
    return values
        .sort((a, b) => a - b)
        .map(value => ({
            value: value,
            label: value.toString()
        }));
};

// Helper function to validate column names
export const validateColumn = (column) => {
    const validColumns = ['number', 'mod350', 'mod8000', 'mod20002'];
    return validColumns.includes(column);
};

// Helper function to parse pagination parameters
export const parsePagination = (page = 1, limit = 100) => {
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(1000, parseInt(limit, 10))); // Max 1000 per page
    const skip = (pageNum - 1) * limitNum;
    
    return { page: pageNum, limit: limitNum, skip };
};