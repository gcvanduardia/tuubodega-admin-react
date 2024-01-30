import axios from 'axios';
import { environment } from "../../../enviroments/enviroment";





let token: string | null = null;
let userId: string | null = null;


export const get = async (path: string) => {
    try {
        const url = `${environment.apiUrl}/${path}`;
        console.log("url from api.tsx: ",url);
        const apiResponse = await axios.get(url,
            {
                headers: {
                    'x-api-key': environment.apiKey,
                    'Authorization': token
                }
            });
        console.log("apiResponse from api.tsx: ",apiResponse.data);
        return apiResponse.data;
    } catch (error: any) {
        console.log("error from api.tsx: ",error);
        return {
            Error: true,
            Message: error?.message
        }
    }
};

export const post = async (path: string, data: any) => {
    try {
        const apiResponse = await axios.post(`${environment.apiUrl}/${path}`,
            data,
            {
                headers: {
                    'x-api-key': environment.apiKey,
                    'Authorization': token
                }
            });
        return apiResponse.data;
    } catch (error: any) {
        return {
            Error: true,
            Message: error?.message
        }
    }
};


export const verifySesion = async () => {
    const sesion = localStorage.getItem('TuuBodega-sesion');
    if (!sesion) return false;
    ({token, userId} = JSON.parse(sesion));
    console.log("token from api.tsx: ",token);
    console.log("userId from api.tsx: ",userId);
    try {
        const apiResponse = await axios.get(`${environment.apiUrl}/auth/sesion`,
            {
                headers: {
                    'x-api-key': environment.apiKey,
                    'Authorization': token
                }
            });
        console.log("apiResponse from api.tsx: ",apiResponse.data);
        return true;
    } catch (error) {
        console.log("error from api.tsx: ",{
            Error: true,
            Message: "no se pudo verificar la sesión",
            MessageError: error
        });
        return false;
    }
};

export const login = async (username: string, password: string) => {
    let response:any = {};
    try {
        const apiResponse = await axios.post(`${environment.apiUrl}/auth/login`,
          {
              username: username,
              password: password
          },
          {
              headers: {
                  'x-api-key': environment.apiKey
              }
          });
        response = apiResponse.data;
        if (!response.Error) {
            ({ Token: token, Documento: userId } = response);
            localStorage.setItem('TuuBodega-sesion', JSON.stringify({ token, userId }));
            console.log("token from api.tsx: ",token);
            console.log("userId from api.tsx: ",userId);
        }
    } catch (error: any) {
        if (error.response){
            response = error.response.data;
        }else{
            response = {
                Error: true,
                Message: error?.message
            }
        }
    }
    return response;
};