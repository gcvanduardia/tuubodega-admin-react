import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonInput, IonButton, IonCard, IonImg, IonItem, IonSpinner } from '@ionic/react';
import "./Login.scss";
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/logo1.png';
import { login } from "../../shared/services/api/api";
import Alert from "../../shared/components/alert/alert";
import { useIonRouter } from '@ionic/react';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [textButton, setTextButton] = useState('Iniciar sesión');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
          setTextButton('Iniciando sesión');
        } else {
          setTextButton('Iniciar sesión');
        }
      }, [isLoading]);
    

    const handleLogin = async () => {
        console.log(`Intentando iniciar sesión con ${username} y ${password}`);
        if(isEmailValid === false) return handleAlert('Error', 'Al iniciar sesión', 'Correo electrónico inválido');
        setIsLoading(true);
        const response = await login(username, password);
        setIsLoading(false);
        console.log("response from Login.tsx: ",response);
        if(response.Error) return handleAlert('Error', 'Al iniciar sesión', response.Message);
        console.log("se logró el login correcto");
        router.push('/home', 'root', 'replace');
        /* router.push('/home', 'forward', 'replace'); */
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeader, setAlertHeader] = useState('');
    const [alertSubHeader, setAlertSubHeader] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const handleAlert = (header: string, subHeader: string, message: string) => {
        setAlertHeader(header);
        setAlertSubHeader(subHeader);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const [isTouched, setIsTouched] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>();
    const validateEmail = (email: string) => {
        return email.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        setIsEmailValid(undefined);
        if (value === '') return;
        validateEmail(value) !== null ? setIsEmailValid(true) : setIsEmailValid(false);
    };
    
    const markTouched = () => {
        setIsTouched(true);
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
                                    <IonItem lines='none'>
                                        <IonInput
                                            className={`${isEmailValid && 'ion-valid'} ${isEmailValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                            label='Correo electrónico'
                                            aria-label='Correo electrónico'
                                            type='email'
                                            labelPlacement='floating'
                                            errorText="Correo electrónico inválido"
                                            value={username}
                                            placeholder="Correo electrónico"
                                            onIonInput={e => { setUsername(e.detail.value!); validate(e); }}
                                            onIonBlur={() => markTouched()}
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
                                    <IonButton expand="full" onClick={handleLogin} mode='ios' shape='round'>
                                        {textButton}
                                        {isLoading && <IonSpinner name='dots' slot='end'></IonSpinner>}
                                    </IonButton>
                                    <Alert
                                      isOpen={showAlert}
                                      onDismiss={() => setShowAlert(false)}
                                      header={alertHeader}
                                      subHeader={alertSubHeader}
                                      message={alertMessage}
                                      buttons={['OK']}
                                    />
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