import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import "./QuienesSomos.css";
import { radio } from 'ionicons/icons';

const QuienesSomos: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiénes Somos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <section className="intro-section">
          <h2>Sobre Nosotros</h2>
          <p>
            Bienvenidos a nuestra aplicación. Este proyecto fue creado con dedicación y esfuerzo por <strong>Dylan Rodríguez</strong>, como parte de la asignatura <strong>Ingeniería Web</strong>. 
          </p>
          <img className="profile-img" src="../assets/images/profile.png" alt="Dylan Rodríguez" />
        </section>

        <div className="about-section">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Nuestra Visión</IonCardSubtitle>
              <IonCardTitle>Impactar Positivamente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Creemos en el poder de la tecnología para transformar vidas. Este proyecto tiene como objetivo facilitar el acceso a servicios de salud mental y crear una experiencia segura y eficiente para los usuarios.
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonImg src="https://via.placeholder.com/600x300" alt="Equipo trabajando" />
            <IonCardHeader>
              <IonCardSubtitle>El Origen</IonCardSubtitle>
              <IonCardTitle>Un Proyecto Universitario</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Este proyecto nació como parte de la asignatura Ingeniería Web, donde se fomentó la creatividad y la implementación de soluciones tecnológicas orientadas al usuario.
            </IonCardContent>
          </IonCard>
        </div>

        <section className="cta-section">
          <h3>¿Tienes dudas o sugerencias?</h3>
          <p>¡Estamos aquí para escucharte! Contacta a Dylan Rodríguez a través de los canales habilitados en nuestra aplicación.</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default QuienesSomos;
