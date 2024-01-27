import React, {useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../shared/components/ExploreContainer';
import './Home.scss';
/* import { verifySesion } from "../../core/Hooks/sesion"; */
import { sesion } from "../../shared/services/api/api";


const Home: React.FC = () => {
  useEffect(() => {
    const checkSesion = async () => {
      const sesionResponse = await sesion();
      console.log("sesionResponse from Home.tsx: ",sesionResponse);
    };

    checkSesion();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blanksfas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
