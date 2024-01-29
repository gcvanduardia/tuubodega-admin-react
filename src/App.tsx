import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ProtectedRoutes from "./core/Hooks/ProtectedRoutes";
import HeaderMain from "./shared/components/HeaderMain/HeaderMain";

setupIonicReact();
const version = 'v0.0.2';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <ProtectedRoutes />
      <HeaderMain />
      <IonContent>
        <IonRouterOutlet>
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/"> <Redirect to="/dashboard" /> </Route>
          <Route exact path="/home"> <Home /> </Route>
          <Route exact path="/dashboard"> <Dashboard /> </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonReactRouter>
    <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px', color: 'rgba(0, 0, 0, 0.5)' }}>{version}</div>
  </IonApp>
);

export default App;
