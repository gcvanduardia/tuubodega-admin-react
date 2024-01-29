import React from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import './Dashboard.scss';

const Dashboard: React.FC = () => {

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonText>Dashborad Works</IonText>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;