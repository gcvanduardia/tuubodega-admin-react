import React, { useState, useEffect } from 'react';
import { IonHeader, IonText, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import './HeaderMain.scss';
import MenuMain from "../MenuMain/MenuMain";
import { useLocation } from 'react-router-dom';

const HeaderMain: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const parametro = queryParams.get('title');
        setTitle(parametro || location.pathname);
    }, [location.pathname]);

    if (location.pathname === '/login') return null;

    return (
        <>
            <MenuMain />
            <IonHeader mode='ios' id="menu-main">
                <IonToolbar className='ion-text-center'>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonText>{title}</IonText>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default HeaderMain;