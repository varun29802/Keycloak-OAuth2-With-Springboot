import axios from 'axios';
import keycloak from '../config/keycloak';


const apiAxios = axios.create({
    baseURL: "http://localhost:8081/api/v1/products",
   
})

export const loadProducts = async() => {
   const response = await apiAxios.get("",{
         headers: {
        'Authorization':`Bearer ${keycloak.token}`
    }
    })

    return response.data
}