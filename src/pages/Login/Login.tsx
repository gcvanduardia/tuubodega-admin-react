import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonInput, IonButton, IonCard, IonImg, IonItem } from '@ionic/react';
import "./Login.scss";
import React, { useState } from 'react';
import Logo from '../../assets/img/logo1.png';

const Login: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(`Intentando iniciar sesión con ${username} y ${password}`);
        if (username === 'admin' && password === 'admin') {
            console.log('Inicio de sesión exitoso');
        }
    };

    return (
        <IonPage>
          <IonContent>
            <div className='fondo'>
            </div>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <div className="content-center">
                                <IonCard>
                                    <div className="content-center">
                                      <IonImg class="imgHeader" src={Logo} alt={Logo}></IonImg>
                                    </div>
                                    <IonItem>
                                        <IonInput
                                            label='Usuario'
                                            aria-label='Usuario'
                                            labelPlacement='floating'
                                            value={username}
                                            placeholder="Nombre de usuario"
                                            onIonInput={e => { setUsername(e.detail.value!); }}
                                        />
                                    </IonItem>
                                    <IonItem>
                                        <IonInput
                                            label='Contraseña'
                                            aria-label='Contraseña'
                                            labelPlacement='floating'
                                            value={password}
                                            placeholder="Contraseña"
                                            type="password"
                                            onIonInput={e => { setPassword(e.detail.value!); }}
                                        />
                                    </IonItem>
                                    <IonButton expand="full" onClick={handleLogin} mode='ios' shape='round'>Iniciar sesión</IonButton>
                                    <div className="content-end">
                                      <IonButton fill="clear" mode="ios"><b><u>Recuperar contraseña</u></b></IonButton>
                                    </div>
                                </IonCard>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
          </IonContent>
        </IonPage>
    );
};

export default Login;