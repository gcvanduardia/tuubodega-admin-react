import { useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { verifySesion } from "../../shared/services/api/api";
import { useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
    const router = useIonRouter();
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const sesion = await verifySesion();
                checkRoutes(sesion);
            } catch (error) {
                console.error('Error al verificar la sesión', error);
            }
        };

        checkAuthentication();
    }, [location.pathname]);


    const checkRoutes = (sesion: any) => {
        const actualRoute = location.pathname;
        console.log('actual route: ', actualRoute);
        console.log('sesion: ', sesion);
        if (!sesion && actualRoute !== '/login') return (window.location.href = '/login');
        if (sesion && actualRoute === '/login') return (router.push('/dashboard', 'root', 'replace'));
    };

    return null;
};

export default ProtectedRoutes;

