import { ajax } from "../tools/ajax";

export const getCityWeather = async (city) => {

    const optionsRequest = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params:{
            q:city,
            appid: "75bedce8c17dd89d7367342ac716cce8",
            units: "metric", //para que me traiga en grados centigrados
        }
      }; 
     

   return await ajax(optionsRequest)
}