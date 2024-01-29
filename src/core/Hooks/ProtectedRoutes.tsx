import { useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { verifySesion } from "../../shared/services/api/api";

const ProtectedRoutes = () => {
    const router = useIonRouter();

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
    }, []);

    const checkRoutes = (sesion: any) => {
        const actualRoute = router.routeInfo?.pathname;
        console.log('actual route: ', actualRoute);
        if (!sesion) return router.push('/login', 'root', 'replace');
        if (actualRoute === '/login') return router.push('/dashboard', 'root', 'replace');
    };

    return null;
};

export default ProtectedRoutes;

