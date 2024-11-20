import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg, IonButton, IonButtons, IonMenuButton } from '@ionic/react';
import "./Servicios.css";

const Servicios: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='logoBtn'><IonButton><IonImg className='logo' src='../assets/images/logo.png'/></IonButton></IonTitle>
          <IonButtons slot='end'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <section className="intro-section">
          <h2>Descubre nuestros servicios</h2>
          <p>
            Nuestra plataforma está diseñada para ofrecerte soluciones personalizadas en el área de la salud mental. Explora los servicios que ponemos a tu disposición y encuentra el soporte que necesitas.
          </p>
        </section>

        <div className="services-container">
          <IonCard>
            <IonImg src='https://via.placeholder.com/600x300' alt="Servicio 1" />
            <IonCardHeader>
              <IonCardSubtitle>Terapias Personalizadas</IonCardSubtitle>
              <IonCardTitle>Sesiones individuales</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Conéctate con psicólogos certificados para sesiones privadas adaptadas a tus necesidades. Nuestra plataforma asegura tu privacidad y comodidad.
            </IonCardContent>
          </IonCard>

          {/* Servicio 2 */}
          <IonCard>
            <IonImg src="https://via.placeholder.com/600x300" alt="Servicio 2" />
            <IonCardHeader>
              <IonCardSubtitle>Grupos de Apoyo</IonCardSubtitle>
              <IonCardTitle>Comunidades seguras</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Únete a grupos de apoyo dirigidos por profesionales y conecta con personas que comparten tus experiencias.
            </IonCardContent>
          </IonCard>

          {/* Servicio 3 */}
          <IonCard>
            <IonImg src="https://via.placeholder.com/600x300" alt="Servicio 3" />
            <IonCardHeader>
              <IonCardSubtitle>Seguimiento Personalizado</IonCardSubtitle>
              <IonCardTitle>Plan de progreso</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Diseñamos planes de seguimiento para medir tu progreso y ajustar el tratamiento según tus objetivos personales.
            </IonCardContent>
          </IonCard>
        </div>

        <section className="cta-section">
          <h3>¿Estás listo para mejorar tu bienestar?</h3>
          <p>Únete a nuestra comunidad y aprovecha todos los beneficios que tenemos para ofrecerte.</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Servicios;
