//encapsulamos la llamada con fetch o axios

import axios from "axios";

export const ajax = async (options) => await axios.request(options).then(response => response.data); 
//ajax (asynchronous javascript and xml, asi se le conocen a los servios de peticiones por pedidos asincronicos)
// ajax es el proceso tradicional a traves el cual nosotros hacemos peticiones asincronicas.

