import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Busqueda from './Busqueda';
import './Menu.css';
function Menu() {
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
                <IonButton className='menuBtn' routerLink="/Home">Inicio</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn'>Servicios</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn'>Quienes somos</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn' routerLink="/Home">Inicia Sesion</IonButton>
            </IonItem>
            <IonItem>
                <IonButton className='menuBtn' routerLink="/Registrarse">Unete!</IonButton>
            </IonItem>
        </IonList>
        </IonContent>
      </IonMenu>
      
    </>
  );
}
export default Menu;