import axios from 'axios';

/**
 * request data from api
 * @param {String} apiUrl api parth
 * @param {Object} data request body
 * @param {String} method HTTP method
 */
const request = async (
    apiUrl=null,
    method="GET",
    data
) => {
    try {
        const response = await axios({
            headers:{
                accept: 'application/json',
                'Content-Type':'application/json'
            },
            method: method,
            url: apiUrl,
            data: data,
        });
        return {
            _status: true,
            data: response.data
        } 
    } catch(ex){
        return {
            _status: false,
            data: ex
        } 
    }
};

export {
    request
}