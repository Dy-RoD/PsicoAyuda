import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Busqueda from './Busqueda';
import './Menu.css';
function Menu() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
      // Eliminar el token de localStorage al cerrar sesión
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      window.location.href = "/Home";
    };
  return (
    <>
      
      <IonMenu side="end" contentId="main-content" >
        <IonHeader >
          <IonToolbar className='searchPA'>
            <IonTitle><IonImg className='logo' src='../assets/images/logo.png'/></IonTitle>
          </IonToolbar>
          <IonToolbar className='searchPA'>
              <Busqueda />
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList>
            <IonItem>
                <IonButton className='menuBtn' routerLink="/Perfil">Inicio</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn'>Servicios</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn'>Quienes somos</IonButton>
            </IonItem>
            {isAuthenticated ? (
              <>
                <IonItem>
                  <IonButton className='menuBtn' routerLink="/Perfil">Mi Perfil</IonButton>
                </IonItem>
                <IonItem>
                  <IonButton className='menuBtn' onClick={handleLogout}>Cerrar Sesión</IonButton>
                </IonItem>
              </>
            ) : (
              <>
                <IonItem>
                  <IonButton className='menuBtn' routerLink="/Home">Inicia Sesion</IonButton>
                </IonItem>
                <IonItem>
                  <IonButton className='menuBtn' routerLink="/Registrarse">Unete!</IonButton>
                </IonItem>
              </>
            )}
        </IonList>
        </IonContent>
      </IonMenu>
      
    </>
  );
}
export default Menu;