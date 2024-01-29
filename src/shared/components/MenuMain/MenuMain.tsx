import React from 'react';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonMenuToggle, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { analyticsOutline, downloadOutline, storefrontOutline, peopleOutline, peopleCircleOutline, personOutline, exitOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './MenuMain.scss';
import { useIonRouter } from '@ionic/react';

export const mainMenuArray = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: analyticsOutline
    },
    {
        title: 'Operaciones',
        url: '/home',
        icon: downloadOutline
    },
    {
        title: 'Productos',
        url: '/productos',
        icon: storefrontOutline
    },
    {
        title: 'Usuarios',
        url: '/usuarios',
        icon: peopleOutline
    },
    {
        title: 'Proveedores',
        url: '/proveedores',
        icon: peopleCircleOutline
    },
    {
        title: 'Cuenta',
        url: '/cuenta',
        icon: personOutline
    }
];

const MenuMain: React.FC = () => {

    const router = useIonRouter();
    const history = useHistory();

    const cerrarSesion = () => {
        localStorage.removeItem('TuuBodega-sesion');
        router.push('/login', 'root', 'replace');
    }

    const goToPage: any = (e:Event,item: any) => {
        e.preventDefault();
        history.push(item.url);
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
                            <IonItem detail={false} key={item.url} onClick={(e) => goToPage(e,item)} className='like-button'>
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