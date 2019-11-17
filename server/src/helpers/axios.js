import axios from 'axios';
import config from 'config';

export const get = async (headers, url) => {
    try{
	    const response = await axios({
		    method: 'GET',
		    timeout: config.get('axios.timeout'),
		    url,
		    headers,
	});
        return response;
    }catch(err){
        throw err
    }
};
