import React from 'react';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonMenuToggle, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { analyticsOutline, downloadOutline, storefrontOutline, peopleOutline, peopleCircleOutline, personOutline, exitOutline, personAddOutline } from 'ionicons/icons';
import './MenuMain.scss';
import { useIonRouter } from '@ionic/react';
import { Link } from 'react-router-dom';

export const mainMenuArray = [
    {
        id: 1,
        title: 'Dashboard',
        url: '/dashboard',
        icon: analyticsOutline,
        detail: false
    },
    {
        id: 2,
        title: 'Operaciones',
        url: '/operaciones',
        icon: downloadOutline,
        detail: false
    },
    {
        id: 3,
        title: 'Productos',
        url: '/productos',
        icon: storefrontOutline,
        detail: false
    },
    {
        id: 4,
        title: 'Usuarios',
        url: '/usuarios',
        icon: peopleOutline,
        detail: false
    },
    {
        id: 5,
        title: 'Proveedores',
        url: '/proveedores',
        icon: peopleCircleOutline,
        detail: false
    },
    {
        id: 6,
        title: 'Clientes',
        url: '/clientes',
        icon: personAddOutline,
        detail: false
    },
    {
        id: 7,
        title: 'Cuenta',
        url: '/cuenta',
        icon: personOutline,
        detail: false
    }
];

const MenuMain: React.FC = () => {

    const router = useIonRouter();

    const cerrarSesion = () => {
        localStorage.removeItem('TuuBodega-sesion');
        router.push('/login', 'root', 'replace');
    }

    return (
        <IonMenu contentId="menu-main">
            <IonHeader mode='ios'>
                <IonToolbar>
                    <IonTitle>Menu Principal</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonMenuToggle>
                    <IonList>
                        {mainMenuArray.map(item => (
                            <IonItem key={item.id} detail={item.detail} routerLink={item.url}>
                                <IonIcon icon={item.icon} slot='start'></IonIcon>
                                <IonLabel> {item.title} </IonLabel>
                            </IonItem>
                        ))}
                        <IonButton fill="clear" mode="ios" expand='block' onClick={cerrarSesion}>
                            Cerrar Sesión
                            <IonIcon icon={exitOutline} slot='end'></IonIcon>
                        </IonButton>
                    </IonList>
                </IonMenuToggle>
            </IonContent>
        </IonMenu>
    );
}
export default MenuMain;