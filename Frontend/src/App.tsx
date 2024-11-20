import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/*import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import Registrarse from './pages/Registrarse';
import MetodoPago from './pages/MetodoPago';
import Menu from './components/Menu';
import Busqueda from './components/Busqueda';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';
import Profesionales from './pages/Profesionales';
import Servicios from './pages/Servicios';
import QuienesSomos from './pages/QuienesSomos';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <Busqueda />
      <IonRouterOutlet  id='main-content'>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/Registrarse">
          <Registrarse />
        </Route>
        <Route exact path="/MetodoPago">
          <MetodoPago />
        </Route>
        <Route exact path="/Calendario">
          <Calendario />
        </Route>
        <Route exact path="/Perfil">
          <Perfil />
        </Route>
        <Route exact path="/servicios">
          <Servicios />
        </Route>
        <Route exact path="/QuienesSomos">
          <QuienesSomos />
        </Route>
        <Route path="/profesionales/:region" component={Profesionales} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
