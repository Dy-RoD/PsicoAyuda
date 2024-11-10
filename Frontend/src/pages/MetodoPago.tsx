import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonLabel, IonButton, IonSelect, IonSelectOption, IonFooter, IonImg, IonButtons, IonBackButton, IonMenuButton } from '@ionic/react';
import './MetodoPago.css'; // Asegúrate de crear un archivo de estilos separado para los estilos específicos.

const MetodoPago = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className='logoBtn'><IonButton routerLink="/"><IonImg className='logo' src='../assets/images/logo.png'/></IonButton></IonTitle>
          <IonButtons slot='end'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding mp">
        {/* Información del Psicólogo */}
        <div className="centrar-informacion">
          <h1>Información de Reserva</h1>
          <h2>Psicólogo: Lupita Rodriguez</h2>
          <h2>Fecha: 13/11/2024</h2>
        </div>

        {/* Formulario de Pago */}
        <div className="centrar-form">
          <section className="pago">
            <form className='formu'>
              <IonLabel>Email</IonLabel>
              <div className="input-Pago">
                <IonInput type="email" placeholder="ejemplo@ejemplo.com" />
              </div>

              <IonLabel>Información de tarjeta</IonLabel>
              <div className="input-Pago">
                <IonInput type="text" placeholder="1234-1234-1234-1234" />
              </div>
              
              <div className="container-datos">

                <IonInput className="input-Pago cvv" type="text" placeholder="MM/AA" />
                <IonInput className="input-Pago cvv" type="text" placeholder="CVV" />                    
                <IonImg className="tarjetas" src="../assets/images/tarjetas.png" />
              </div>

              <IonLabel>Nombre</IonLabel>
              <div className="input-Pago">
                <IonInput type="text" placeholder="Nombre del titular" />
              </div>
              <IonLabel>País</IonLabel>
              <IonSelect className="selec-pais" name="paises" placeholder='Selecciona un país'>
                <IonSelectOption value="Opcion">Selecciona un país</IonSelectOption>
                <IonSelectOption value="Chile">Chile</IonSelectOption>
                <IonSelectOption value="Argentina">Argentina</IonSelectOption>
                <IonSelectOption value="Brasil">Brasil</IonSelectOption>
              </IonSelect>

              <IonButton expand="block" className="pagar" id="BtnPagar" routerLink="/Calendario">Pagar</IonButton>
            </form>
          </section>
        </div>

        {/* Botón para volver atrás (versión móvil) 
        <div className="btVolver">
          <IonButtons>
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </div>*/}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <p>@2024 hecho por Dylan Rodriguez</p>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MetodoPago;
