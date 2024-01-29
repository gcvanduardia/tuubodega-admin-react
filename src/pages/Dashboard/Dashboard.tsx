import React from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import './Dashboard.scss';

const Home: React.FC = () => {

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonText>Dashborad Works</IonText>
            </IonContent>
        </IonPage>
    );
}

export default Home;