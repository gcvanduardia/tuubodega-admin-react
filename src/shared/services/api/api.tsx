import axios from 'axios';
import { useIonAlert } from '@ionic/react';
import { environment } from "../../../enviroments/enviroment";

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