
const apiBaseURL = "http://localhost:5000/api"

export const getGatewayData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'getGatewayData',
};

export const updateGatewayData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'updateGatewayData',
};

export const addGatewayData = {
    apiUrl: `${apiBaseURL}/gateway`,
    apiKey: 'appGatewayData',
};

export const removeGatewayData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'removeGatewayData',
};

export const updateDeviceData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'updateDeviceData',
};

export const addDeviceData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'appDeviceData',
};

export const removeDeviceData = {
    apiUrl: `${apiBaseURL}/gateway/`,
    apiKey: 'removeDeviceData',
};