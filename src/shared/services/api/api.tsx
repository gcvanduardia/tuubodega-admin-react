import { useContext, useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { environment } from "../../../enviroments/enviroment";
import { GlobalContext } from "../global/global";

const useApi = () => {
    const { setIdUser} = useContext(GlobalContext);
    const getJwt = useCallback(() => {
        const sesion = localStorage.getItem('TuuBodega-sesion');
        if (!sesion) return null;
        /* return JSON.parse(sesion); */
        return sesion;
    }, []);

    const verifySesion = useCallback(async () => {
        const jwt = getJwt();
        if (!jwt) return false;
        try {
            const response = await axios({
                method: 'GET',
                url: `${environment.apiUrl}/auth/sesion`,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'x-api-key': environment.apiKey
                }
            });
            const responseStatus = response.status === 200;
            if (responseStatus) {
                console.log("IdUsuario from verifySesion: ", response.data.data.IdUsuario);
                setIdUser(response.data.data.IdUsuario);
            }
            return responseStatus;
        } catch (error) {
            // handle error
            console.error('Error al verificar la sesión: ', error);
            return false;
        }
    }, [getJwt, setIdUser]);

    const apiReq = useCallback(async (method: string, url: string, data: object = {}) => {
        const jwt = getJwt();
        try {
            const response = await axios({
                method: method,
                url: `${environment.apiUrl}/${url}`,
                data: data,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'x-api-key': environment.apiKey
                }
            });
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                return {
                    data: axiosError.response.data,
                    status: axiosError.response.status
                };
            }
            // handle error
            return null;
        }
    }, [getJwt]);

    return { verifySesion, apiReq };
};

export default useApi;