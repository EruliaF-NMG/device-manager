import axios from 'axios';

/**
 * request data from api
 * @param {String} apiUrl api parth
 */
const getData = async (
    apiUrl,
) => {
    try {
        const response = await axios.get(apiUrl);
        return {
            _status: true,
            data: response.data.drinks
        } 
    } catch(ex){
        return {
            _status: false,
            data: null
        } 
    }
};

export {
    getData
}