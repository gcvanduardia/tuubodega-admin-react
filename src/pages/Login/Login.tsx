import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonInput, IonButton, IonCard, IonImg, IonItem, IonSpinner } from '@ionic/react';
import "./Login.scss";
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/logo1.png';
import useApi from "../../shared/services/api/api";
import Alert from "../../shared/components/AlertMain/AlertMain";
import { useIonRouter } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { validation } from "./utils/validations";

const Login: React.FC = () => {
  const router = useIonRouter();
  const { apiReq } = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [textButton, setTextButton] = useState('Iniciar sesión');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isEmailTouched, isEmailValid, validateEmail, markEmailTouched, emailInputRef, isPasswordValid, validatePassword, markPasswordTouched, isPasswordTouched, passwordInputRef, validationFocus, setValidationFocus } = validation();
  const [alert, setAlert] = useState({ showAlert: false, alertHeader: '', alertSubHeader: '', alertMessage: '' });

  useEffect(() => {
    if (isLoading) {
      setTextButton('Iniciando sesión');
    } else {
      setTextButton('Iniciar sesión');
    }
  }, [isLoading]);

  useEffect(() => {
    if (alert.showAlert) return;
    if (validationFocus === 'email') {
      emailInputRef.current?.getInputElement().then((input: any) => input.focus());
      return;
    }
    if (validationFocus === 'password') {
      passwordInputRef.current?.getInputElement().then((input: any) => input.focus());
      return;
    }
  }, [alert.showAlert]);

  const handleLogin = async () => {
    if (isLoading) return;
    console.log(`Intentando iniciar sesión con ${username} y ${password}`);
    if (!validations()) return;
    login(username, password);
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    const data = {
      username: username,
      password: password
    }
    await apiReq('POST', 'auth/loginAdmin', data)
      .then((res:any) => {
        console.log("res from Login.tsx: ", res);
        if (res.status !== 200) {
          showAlert('Error', 'Al iniciar sesión', res.data.Message);
          return;
        }
        const jwt = res.data.Token;
        if (!jwt) {
          showAlert('Error', 'Al iniciar sesión', 'No se recibió el token de sesión');
          return;
        }
        localStorage.setItem('TuuBodega-sesion', JSON.stringify(res.data.Token));
        router.push('/dashboard', 'root', 'replace');
      })
      .catch((error) => {
        showAlert('Error', 'Al iniciar sesión', JSON.stringify(error));
      });
    setIsLoading(false);
  };

  const validations = () => {
    markEmailTouched();
    if (isEmailValid === false) {
      showAlert('Error', 'Al iniciar sesión', 'Correo electrónico inválido');
      setValidationFocus('email');
      return false;
    }
    markPasswordTouched();
    if (isPasswordValid === false) {
      showAlert('Error', 'Al iniciar sesión', 'Contraseña inválida');
      setValidationFocus('password');
      return false;
    }
    return true;
  }

  const showAlert = (header: string, subHeader: string, message: string) => {
    setAlert(prevState => ({
      ...prevState,
      showAlert: true,
      alertHeader: header,
      alertSubHeader: subHeader,
      alertMessage: message
    }));
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
                <IonCard mode="ios">
                  <div className="content-center">
                    <IonImg class="imgHeader" src={Logo} alt={Logo}></IonImg>
                  </div>
                  <IonItem lines='none'>
                    <IonInput
                      ref={emailInputRef}
                      className={`${isEmailValid && 'ion-valid'} ${isEmailValid === false && 'ion-invalid'} ${isEmailTouched && 'ion-touched'}`}
                      label='Correo electrónico'
                      aria-label='Correo electrónico'
                      type='email'
                      labelPlacement='floating'
                      errorText="Correo electrónico inválido"
                      value={username}
                      placeholder="Correo electrónico"
                      onIonInput={e => { setUsername(e.detail.value!); validateEmail(e.detail.value!); }}
                      onIonBlur={() => markEmailTouched()}
                      onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                    />
                  </IonItem>
                  <IonItem lines='none'>
                    <IonInput
                      ref={passwordInputRef}
                      className={`${isPasswordValid && 'ion-valid'} ${isPasswordValid === false && 'ion-invalid'} ${isPasswordTouched && 'ion-touched'}`}
                      label='Contraseña'
                      aria-label='Contraseña'
                      labelPlacement='floating'
                      errorText='Contraseña inválida'
                      value={password}
                      placeholder="Contraseña"
                      type={showPassword ? "text" : "password"}
                      onIonInput={e => { setPassword(e.detail.value!); validatePassword(e.detail.value!); }}
                      onIonBlur={() => markPasswordTouched()}
                      onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                    />
                    <IonButton slot="end" fill='clear' onClick={() => setShowPassword(!showPassword)} className='show-password'>
                      <IonIcon color={showPassword ? 'primary' : 'medium'} size='large' icon={showPassword ? eyeOff : eye} />
                    </IonButton>
                  </IonItem>
                  <IonButton expand="full" onClick={handleLogin} mode='ios' shape='round' disabled={isLoading}>
                    {textButton}
                    {isLoading && <IonSpinner name='dots' slot='end'></IonSpinner>}
                  </IonButton>
                  <Alert
                    isOpen={alert.showAlert}
                    onDismiss={() => { setAlert(prevState => ({ ...prevState, showAlert: false })); }}
                    header={alert.alertHeader}
                    subHeader={alert.alertSubHeader}
                    message={alert.alertMessage}
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