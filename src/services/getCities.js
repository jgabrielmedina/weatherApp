import { ajax } from "../tools/ajax";

export const getCities = async (countryCode) => {

    const optionsRequest = {
        method: 'GET',
        url: 'https://api.teleport.org/api/cities/',
        params:{
            search:countryCode,
        }
      }; 
     

   return await ajax(optionsRequest)
}
