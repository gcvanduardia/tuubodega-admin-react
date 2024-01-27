import axios from 'axios';
import { useIonAlert } from '@ionic/react';
import { environment } from "../../../enviroments/enviroment";

export const sesion = async () => {
    const token = localStorage.getItem('TuuBodega-token');
    if (!token) return false;
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

export const alert = async (header: string, subHeader: string, message: string) => {
    const [presentAlert] = useIonAlert();
    presentAlert({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['Action'],
    })
}