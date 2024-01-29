import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Operaciones from "./pages/Operaciones/Operaciones";

const AppRoutes: React.FC = () => (
    <IonRouterOutlet>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/"> <Redirect to="/dashboard" /> </Route>
        <Route exact path="/home"> <Home /> </Route>
        <Route exact path="/dashboard"> <Dashboard /> </Route>
        <Route exact path="/operaciones"> <Operaciones /> </Route>
    </IonRouterOutlet>
);

export default AppRoutes;