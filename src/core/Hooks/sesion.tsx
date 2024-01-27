import { useIonRouter } from '@ionic/react';
import { sesion } from "../../shared/services/api/api";


export const verifySesion = async () => {
    const router = useIonRouter();
    const actualRoute = router.routeInfo.pathname;
    console.log('actual route: ', actualRoute);
    const sesionResponse = await sesion();
    console.log("sesionResponse from sesion.tsx: ",sesionResponse);
    /* if (!sesionResponse) {
      router.push('/login', 'root', 'replace');
    }else{
      if(actualRoute === '/login') router.push('/home', 'root', 'replace');
    } */
};
    
