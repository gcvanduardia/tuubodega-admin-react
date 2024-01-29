import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Operaciones from "./pages/Operaciones/Operaciones";
import Productos from './pages/Productos/Productos';
import Usuarios from './pages/Usuarios/Usuarios';
import Proveedores from './pages/Proveedores/Proveedores';
import Clientes from './pages/Clientes/Clientes';
import Cuenta from './pages/Cuenta/Cuenta';

const AppRoutes: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route exact path="/"> <Redirect to="/login" /> </Route>
            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/dashboard"> <Dashboard /> </Route>
            <Route exact path="/home"> <Home /> </Route>
            <Route exact path="/operaciones"> <Operaciones /> </Route>
            <Route exact path="/productos"> <Productos /> </Route>
            <Route exact path="/usuarios"> <Usuarios /> </Route>
            <Route exact path="/proveedores"> <Proveedores /> </Route>
            <Route exact path="/clientes"> <Clientes /> </Route>
            <Route exact path="/cuenta"> <Cuenta /> </Route>
        </IonRouterOutlet>
    )
};

export default AppRoutes;