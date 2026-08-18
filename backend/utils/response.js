/**
 * Standardize API response
 * @param {boolean} success - True if request succeeded, false otherwise
 * @param {string} message - Message explaining the response
 * @param {object|array|null} data - Payload data
 * @returns {object} Formatted response object
 */
const formatResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data
    };
};

module.exports = formatResponse;
