import React from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import './Productos.scss';

const Productos: React.FC = () => {

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonText>Productos Works!!!</IonText>
            </IonContent>
        </IonPage>
    );
}

export default Productos;